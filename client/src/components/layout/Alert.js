import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    <div>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className="alert alert-danger">
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alert;
