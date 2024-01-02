import React from "react";
import { useParams } from "react-router-dom";

const AssignmentItem = () => {
  const { id } = useParams();
  
  return <div>{id}</div>;
};

export default AssignmentItem;
