import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { QuizResults } from "../services/getResult";
import { calculateResults } from "../utils/Helper";
import { sortResults } from "../utils/Helper";
import "../css/QuizResults.css";
import moment from "moment";
import PaginationComponent from "../Paginations/Paginations";
import Spinner from "../layouts/Spinner";
import { useApiToken } from "../services/auth/Token";

export default function QuizResultsTable() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const getToken = useApiToken();
  const resultsPerPage = 10;
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;

  useEffect(() => {
    async function fetchResults() {
      try {
        const token = await getToken();
        const data = await QuizResults(token);
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch quiz results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  if (loading) return <Spinner />;

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  const sortedResults = sortResults(results, sortColumn, sortOrder);
  const currentResults = sortedResults.slice(indexOfFirst, indexOfLast);

  const renderSortArrow = (column) => {
    if (sortColumn !== column) return null;
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4" style={{ fontSize: "2.25rem" }}>
        Past Quiz Results
      </h2>

      {results.length === 0 ? (
        <Alert
          variant="light"
          className="text-center py-3 fs-6 shadow-sm border-start border-3"
          style={{ background: "#F3F4F6" }}
        >
          You haven't performed any quiz yet. Take a quiz to see results here.
        </Alert>
      ) : (
        <>
          <div
            className="shadow rounded border"
            style={{
              overflowX: "auto",
              maxWidth: "100%",
              background: "#F9FAFB",
            }}
          >
            <Table
              bordered
              hover
              responsive
              className="m-0"
              style={{ fontSize: "0.85rem" }}
            >
              <thead
                style={{
                  background: "#4338CA",
                  color: "white",
                  position: "sticky",
                  top: 0,
                  zIndex: 5,
                }}
              >
                <tr>
                  {[
                    { key: "#", label: "#" },
                    { key: "totalQuestions", label: "Total Questions" },
                    { key: "correctAnswers", label: "Correct Answers" },
                    { key: "wrongAnswers", label: "Incorrect Answers" },
                    { key: "notAttempted", label: "Not Attempted" },
                    { key: "percentage", label: "Score (%)" },
                    { key: "totalTime", label: "Allocated Time" },
                    { key: "timeTaken", label: "Time Taken" },
                    { key: "createdAt", label: "Date & Time" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => key !== "#" && handleSort(key)}
                      className={key !== "#" ? "sortable-th" : ""}
                      style={{
                        cursor: key !== "#" ? "pointer" : "default",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        padding: "8px 10px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        {label}
                        {key !== "#" && renderSortArrow(key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentResults.map((res, idx) => {
                  const total = res.totalQuestions || 0;
                  const correct = res.correctAnswers || 0;
                  const notAttempted = res.notAttempted || 0;
                  const result = calculateResults(correct, total, notAttempted);

                  let rowStyle = { fontSize: "0.82rem" };
                  if (result.percentage >= 75 && notAttempted === 0)
                    rowStyle.backgroundColor = "#E6F9EE";
                  else if (result.percentage >= 50 && notAttempted === 0)
                    rowStyle.backgroundColor = "#F0FFF4";
                  else if (result.percentage < 50)
                    rowStyle.backgroundColor = "#FFE5E5";
                  else if (notAttempted > 0)
                    rowStyle.backgroundColor = "#FFF7DB";

                  return (
                    <tr key={res._id || idx} style={rowStyle}>
                      <td style={{ padding: "6px 8px" }}>
                        {indexOfFirst + idx + 1}
                      </td>
                      <td style={{ padding: "6px 8px" }}>{total}</td>
                      <td style={{ padding: "6px 8px" }}>{correct}</td>
                      <td style={{ padding: "6px 8px" }}>
                        {result.wrongAnswers}
                      </td>
                      <td style={{ padding: "6px 8px" }}>{notAttempted}</td>
                      <td
                        style={{
                          padding: "6px 8px",
                          fontWeight: 600,
                          color:
                            result.percentage >= 50 ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {result.percentage}%
                      </td>
                      <td style={{ padding: "6px 8px" }}>
                        {moment.utc(res.totalTime * 1000).format("mm:ss")}
                      </td>
                      <td style={{ padding: "6px 8px" }}>
                        {moment.utc(res.timeTaken * 1000 - 1).format("mm:ss")}
                      </td>
                      <td style={{ padding: "6px 8px" }}>
                        {moment(res.createdAt).format("LLL")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <PaginationComponent
            totalItems={results.length}
            itemsPerPage={resultsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
}
