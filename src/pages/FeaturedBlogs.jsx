import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSortBy, useTable } from "react-table";

const FeaturedBlogs = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/blogs`);
        const topPosts = data
          .sort(
            (a, b) =>
              b.longDescription.split(" ").length -
              a.longDescription.split(" ").length
          )
          .slice(0, 10);

        setTopPosts(topPosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Serial Number",
        accessor: (_, idx) => idx + 1,
      },
      {
        Header: "Blog Title",
        accessor: "blogTitle",
      },
      {
        Header: "Blog Owner",
        accessor: "author.name",
      },
      {
        Header: "Blog Owner Photo",
        accessor: "author.photo",
        Cell: ({ value }) => (
          <img src={value} className="h-[40px] w-[40px] rounded-full" alt="" />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: topPosts,
      },
      useSortBy
    );

  return (
    <div className="my-4">
      <div className="overflow-x-auto">
        <h1 className="text-xl mb-4 font-suse text-primary font-semibold">
          Featured Blogs
        </h1>
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={column.id}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {loading
              ? Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={`loading-row-${idx}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width={50} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width={200} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton width={100} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton circle={true} height={40} width={40} />
                    </td>
                  </tr>
                ))
              : rows.map((row) => {
                  prepareRow(row);
                  let rowId = row._id;

                  return (
                    <tr {...row.getRowProps()} key={rowId}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap"
                          key={cell.column.id}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
