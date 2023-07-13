import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./taskActions";

const AllTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.all);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  if (!tasks.length) {
    return <div>Getting tasks now...</div>;
  }

  return (
    <div>
      <h1>All tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.name} Assigned to {task.owner}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;
 