import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

function Supplier() {
  const [body, setBody] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [idSupplier, setIdSupplier] = useState("");

  const head = [
    {
      Header: "Daftar Obat",
      columns: [
        {
          Header: "No",
          Cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        {
          Header: "Kode",
          accessor: "code",
          sortType: "basic",
        },
        {
          Header: "Nama",
          accessor: "name",
          sortType: "basic",
        },
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              <button
                onClick={() => {
                  setIdSupplier(row.original.id);
                  setKode(row.original.code);
                  setNama(row.original.name);
                  setEdit(true);
                  setShowModal(true);
                }}
                className="btn btn-warning mr-2"
              >
                <i className="fas fa-pen mr-2"></i> Edit
              </button>
              <button
                onClick={() => {
                  deleteSupplier(row.original.id);
                }}
                className="btn btn-danger"
              >
                <i className="fas fa-trash mr-2"></i> Delete
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  const fetchSupplier = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/supplier`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBody(result);
      })
      .catch((error) => console.log("error", error));
  };

  const addSupplier = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ code: kode, name: nama });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/supplier`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchSupplier();
      })
      .catch((error) => console.log("error", error));
  };

  const updateSupplier = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ code: kode, name: nama });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/supplier/${idSupplier}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        fetchSupplier();
        setShowModal(false);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteSupplier = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/supplier/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchSupplier();
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <Container title="Supplier" desc="Data Supplier" icon="fa-box">
      {/* Modal */}
      <ReactModal
        isOpen={showModal}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h5>Tambah Supplier</h5>

        <div>
          <div className="mb-2">Kode</div>
          <input
            value={kode}
            onChange={(e) => {
              setKode(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div>
          <div className="mb-2">Nama</div>
          <input
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          {edit ? (
            <button
              className="btn btn-warning"
              onClick={() => {
                updateSupplier();
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-info"
              onClick={() => {
                addSupplier();
                setShowModal(false);
              }}
            >
              Tambah
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </ReactModal>

      {/* Content */}
      <div className="content-box">
        <div className="d-flex mb-2">
          <button
            onClick={() => {
              setEdit(false);
              setShowModal(true);
            }}
            className="btn btn-info"
          >
            <i className="fas fa-plus mr-2"></i>
            Tambah Supplier
          </button>
        </div>
        <ReactTable head={head} body={body}></ReactTable>
      </div>
    </Container>
  );
}

export default Supplier;
