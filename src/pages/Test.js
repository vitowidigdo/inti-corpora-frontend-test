import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import endpoint from "utils/endpoint";

import Header from "components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function Test() {
  const [detailResponse, setResponse] = React.useState([]);
  async function getData() {
    const url = endpoint.test;
    try {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) =>
          setResponse(json?.cifAccountInquiryResponse?.payload?.customerAccount)
        );
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);
  const handleClose = () => setOpenModal(false);
  const [selectedData, setSelectedData] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const openDetailData = (data) => {
    setOpenModal(true);
    setSelectedData(data);
  };

  return (
    <Container>
      {/*  Site header */}
      <Header />
      <input
        placeholder="Search Name"
        onChange={(ev) => setQuery(ev.target.value)}
      />
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Branch Number</th>
            <th>Account No</th>
            <th>Account Name</th>
            <th>Action</th>
            {/* <th>Phone</th> */}
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {detailResponse?.accountList
            ?.filter((post) => {
              if (query === "") {
                return post;
              } else if (
                post?.shortName?.toLowerCase()?.includes(query?.toLowerCase())
              ) {
                return post;
              }
            })
            .map((data) => {
              return (
                <React.Fragment key={data.id}>
                  <tr className="mt-3" onClick={() => openDetailData(data)}>
                    <td>{data?.branchNumber}</td>

                    <td>{data?.accountNumber}</td>

                    <td>{data.shortName}</td>

                    <td
                      colSpan={2}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {data.accountType === "C" && (
                        <td>
                          <Link to={`/posts/${data?.id}`}>
                            <Button variant="outline-primary">Edit</Button>{" "}
                          </Link>
                        </td>
                      )}

                      {(data.accountType === "D" ||
                        data.accountType === "C") && (
                        <td>
                          <Link to={`/albums/${data?.id}`}>
                            <Button variant="outline-danger">Delete</Button>{" "}
                          </Link>
                        </td>
                      )}
                    </td>
                  </tr>
                  <Modal show={openModal} onHide={handleClose} className="">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body
                      style={{
                        maxHeight: "calc(100vh - 210px)",
                        overflowY: "auto",
                        maxWidth: "100%",
                      }}
                    >
                      <Table striped bordered hover responsive className="mt-3">
                        <thead>
                          <tr>
                            <th>Account Number</th>
                            <th>Account Relationship</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                            <th>Branch Number</th>
                            <th>CIF Number</th>
                            <th>Currency Code</th>
                            <th>Product Code</th>
                            <th>Account Name</th>
                          </tr>
                        </thead>
                        <tr className="mt-3">
                          <td>{selectedData?.accountNumber}</td>

                          <td>{selectedData?.accountRelationship}</td>

                          <td>{selectedData?.accountType}</td>

                          <td>{selectedData?.balance}</td>
                          <td>{selectedData?.branchNumber}</td>
                          <td>{selectedData?.cifNumber}</td>
                          <td>{selectedData?.currencyCode}</td>
                          <td>{selectedData?.productCode}</td>
                          <td>{selectedData?.shortName}</td>
                        </tr>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </React.Fragment>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Test;
