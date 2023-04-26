import React, { Fragment } from "react";

const DisplayData = (props) => {
  return (
    <Fragment>
      <div>DisplayData</div>
      <div>
        {props.data.map((data) => (
          <table>
            <thead>
                
            </thead>
          </table>
        ))}
      </div>
    </Fragment>
  );
};

export default DisplayData;
