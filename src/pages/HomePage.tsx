import { StatBoxes } from "../components/HomePage/Statistics/StatBoxes";
import { Table } from "../components/HomePage/JobsiteTable/Table";

export const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <StatBoxes />
      <Table />
    </div>
  );
};
