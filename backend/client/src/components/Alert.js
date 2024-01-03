import React from "react";

function Alert(props) {
  const capt = (word) => {
    let c = word.toLowerCase();
    return c.charAt(0).toUpperCase() + c.slice(1);
  };

  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capt(props.alert.type) === "Danger" ? "error" : ""}</strong> :{" "}
          {props.alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}

export default Alert;
