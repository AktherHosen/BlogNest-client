import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedBlogs = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

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
        setLoading(false); // Stop loading
      }
    };

    getData();
  }, []);

  return (
    <div className="my-4">
      <div className="overflow-x-auto">
        <h1 className="text-xl mb-4 font-suse text-primary font-semibold">
          Featured Blogs
        </h1>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Serial Number</Table.HeadCell>
            <Table.HeadCell>Blog Title</Table.HeadCell>
            <Table.HeadCell>Blog Owner</Table.HeadCell>
            <Table.HeadCell className="text-center">
              Blog Owner Photo
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {loading
              ? // Render skeletons while loading
                Array.from({ length: 10 }).map((_, idx) => (
                  <Table.Row
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-400">
                      <Skeleton width={50} />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <Skeleton width={200} />
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton width={100} />
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton circle={true} height={40} width={40} />
                    </Table.Cell>
                  </Table.Row>
                ))
              : topPosts.map((top, idx) => (
                  <Table.Row
                    key={top._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-400">
                      {idx + 1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      {top.blogTitle}
                    </Table.Cell>
                    <Table.Cell>{top?.author?.name}</Table.Cell>
                    <Table.Cell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={top?.author?.photo}
                        className="h-[40px] w-[40px] rounded-full"
                        alt=""
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
