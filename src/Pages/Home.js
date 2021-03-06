import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import Container from "../Components/Container";
import ReactTable from "../Components/ReactTable";

function Home() {
  const [body, setBody] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listSupplier, setListSupplier] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [supplier, setSupplier] = useState(1);
  const [idDrug, setIdDrug] = useState("");

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
          Header: "Keterangan",
          accessor: "information",
          sortType: "basic",
        },
        {
          Header: "Supplier",
          Cell: ({ row }) => (
            <div>
              {listSupplier.filter(
                (data) => data.id === row.original.id_supplier
              ).length !== 0
                ? listSupplier.filter(
                    (data) => data.id === row.original.id_supplier
                  )[0].name
                : ""}
            </div>
          ),
        },
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              <button
                onClick={() => {
                  setIdDrug(row.original.id);
                  setCode(row.original.code);
                  setName(row.original.name);
                  setInformation(row.original.information);
                  setSupplier(row.original.id_supplier);
                  setEdit(true);
                  setShowModal(true);
                }}
                className="btn btn-warning mr-2"
              >
                <i className="fas fa-pen mr-2"></i> Edit
              </button>
              <button
                onClick={() => {
                  deleteDrug(row.original.id);
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

  const fetchObat = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_API_URL}/drug`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBody(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchSupplier = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/supplier`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setListSupplier(result);
      })
      .catch((error) => console.log("error", error));
  };

  const addObat = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      code: code,
      name: name,
      information: information,
      id_supplier: supplier,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/drug`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchObat();
        setShowModal(false);
      })
      .catch((error) => console.log("error", error));
  };

  const updateObat = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      code: code,
      id_supplier: supplier,
      information: information,
      name: name,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/drug/${idDrug}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchObat();
      })
      .catch((error) => console.log("error", error));
  };

  const deleteDrug = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/drug/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchObat();
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchObat();
    fetchSupplier();
  }, []);

  return (
    <Container title="Home" desc="Data Obat" icon="fa-home">
      {/* Modal */}
      <ReactModal
        isOpen={showModal}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h5>Tambah Obat</h5>

        <div>
          <div className="mb-2">Kode</div>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div>
          <div className="mb-2">Nama</div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div>
          <div className="mb-2">Keterangan</div>
          <input
            value={information}
            onChange={(e) => {
              setInformation(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div>
          <div className="mb-2">Supplier</div>
          <select
            value={supplier}
            onChange={(e) => {
              setSupplier(e.target.value);
            }}
            className="form-control"
          >
            {listSupplier.map((data) => {
              return (
                <option value={data.id} key={data.id}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="d-flex justify-content-between mt-3">
          {edit ? (
            <button
              onClick={() => {
                updateObat();
                setShowModal(false);
              }}
              className="btn btn-warning"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                addObat();
                setShowModal(false);
              }}
              className="btn btn-info"
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
              setShowModal(true);
            }}
            className="btn btn-info"
          >
            <i className="fas fa-plus mr-2"></i>
            Tambah Obat
          </button>
        </div>
        <ReactTable head={head} body={body}></ReactTable>
      </div>
    </Container>
  );
}

export default Home;
