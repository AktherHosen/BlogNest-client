import { useTable, useSortBy } from "@tanstack/react-table";

const columns = [
  {
    Header: "Serial Number",
    accessor: "serialNumber",
  },
  {
    Header: "Blog Title",
    accessor: "blogTitle",
  },
  {
    Header: "Blog Owner",
    accessor: "blogOwner",
  },
  {
    Header: "Blog Owner Photo",
    accessor: "blogOwnerPhoto",
  },
];

const FeaturedBlogs = () => {
  const { data, isLoading } = useQuery(["blogs"], fetchBlogs);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FeaturedBlogs;
