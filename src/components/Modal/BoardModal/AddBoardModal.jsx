import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { dropIn } from "../../../utils/framer-animations";
import { addBoard } from "../../../features/boards/boardSlice";
import { closeAllModals } from "../../../features/global/modalSlice";
import "../../../css/components/Modal/BoardModal/addboardmodal.scss";

// import { ReactComponent as Cross } from "../../../assets/Icons/icon-cross.svg";
import { FaCross } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddBoardModal = () => {
 

  const dispatch = useDispatch();
  // Erros
  const [errorName, setErrorName] = useState(false);
  const [errorColumns, setErrorColumns] = useState({
    index: [],
    error: false,
  });

  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing"]);

  const addBoardSubmit = () => {
    setErrorName(false);
    setErrorColumns({ index: [], error: false });
    if (boardName === "" || boardName.length > 30) {
      setErrorName(true);
      return;
    }
    // If any column is empty or more than 30 characters
    if (columns.some((column) => column === "" || column.length > 30)) {
      // Find the index of the empty columns
      const errorIndex = columns.reduce((acc, column, index) => {
        if (column === "" || column.length > 30) {
          acc.push(index);
        }
        return acc;
      }, []);

      setErrorColumns({ index: errorIndex, error: true });
      return;
    }

    dispatch(addBoard({ boardName, columnNames: columns }));
    dispatch(closeAllModals());
  };

  return (
    <>
      
        <>
          <Backdrop onClick={() => dispatch(closeAllModals())} mobile={false}>
            <form onSubmit={addBoardSubmit}>
              <motion.div
                className="add-board-modal"
                variants={dropIn}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2>Add New Board</h2>
                <div className="modal__input-container">
                  <h3 className="modal-label">Board Name</h3>
                  <input
                    type="text"
                    className={`modal-input ${
                      errorName ? "modal-input__error" : ""
                    }`}
                    value={boardName}
                    placeholder="e.g Web Development"
                    onChange={(e) => {
                      setBoardName(e.target.value);
                      if (e.target.value.length > 30 || e.target.value === "") {
                        setErrorName(true);
                      } else {
                        setErrorName(false);
                      }
                    }}
                  />
                  {errorName && (
                    <p className="modal-input__error__message">
                      Enter Valid Board Name
                    </p>
                  )}
                </div>
                <div className="add-board__columns">
                  <h3 className="modal-label">Board Columns</h3>
                  <div className="add-board__columns__list">
                    {columns.map((column, index) => (
                      <div
                        className={`add-board__columns__list__item   ${
                          errorColumns.index.includes(index) &&
                          "modal-input__error"
                        }`}
                        key={index}
                      >
                        <input
                          type="text"
                          placeholder="e.g Todo"
                          value={column}
                          className={`modal-input   ${
                            errorColumns.index.includes(index) &&
                            "modal-input__error"
                          }`}
                          onChange={(e) => {
                            const newColumns = [...columns];
                            newColumns[index] = e.target.value;
                            setColumns(newColumns);
                          }}
                        />
                        <button
                          onClick={() => {
                            const newColumns = [...columns];
                            newColumns.splice(index, 1);
                            setColumns(newColumns);
                          }}
                        >

<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"   fill={
                              errorColumns.index.includes(index)
                                ? "#ea5555"
                                : "#828FA3"
                            }><g fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"></path><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"></path></g></svg>
                          
                        </button>
                        {errorColumns.index.includes(index) && (
                          <p className="modal-input__error__message-col">
                            Can't be empty
                          </p>
                        )}
                      </div>
                    ))}
                    <button
                      className="btn-modal-add"
                      onClick={(e) => {
                        e.preventDefault();
                        if (columns[0] !== "") {
                          // Remove 0 from index
                          setErrorColumns({ index: [], error: false });
                        }
                        setColumns([...columns, "Doing"]);
                      }}
                    >
                      + Add New Column
                    </button>
                  </div>
                </div>
                <button
                  className="btn-modal-submit"
                  onClick={(event) => {
                    event.preventDefault();
                    addBoardSubmit();
                  }}
                >
                  Create New Board
                </button>
              </motion.div>
            </form>
          </Backdrop>
        </>
    
    </>
  );
};

export default AddBoardModal;
