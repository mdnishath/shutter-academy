import React from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import GlobalLoader from "../components/loaders/GlobalLoader";
import { AiOutlineBook, AiOutlineUser } from "react-icons/ai";
import { MdAirlineSeatLegroomNormal } from "react-icons/md";
import Image from "../components/shared/Image";
import { BsCurrencyDollar } from "react-icons/bs";
import useCart from "../hooks/useCart";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import { API } from "../hooks/useAxios";

const Classes = () => {
  const [axiosSecure] = useAxiosSecure();
  const { loading, user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes/all");
    console.log(res);
    return res.data;
  });
  console.log(classes);

  //handle seletee class
  const handleSeltedClass = async (item) => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    } else {
      if (role != "student") {
        toast.error("You are not a student");
      } else {
        const result = await axiosSecure.post("/cart", {
          classId: item._id,
          title: item.title,
          image: item.image,
          price: Number(item.price),
          email: user.email,
          seats: Number(item.seats),
          enrolled: Number(item.enrolled),
          enrolledClass: item,
        });
        if (result.data.insertedId) {
          toast.success("Class Added To Cart");
          queryClient.invalidateQueries("cart");
        }
        if (result.data.duplicate) {
          toast.error("Item already added to cart");
        }
      }
    }
  };
  if (isLoading || loading) {
    return <GlobalLoader />;
  }
  return (
    <div>
      <Container>
        <div>
          <div className="my-5 text-center">
            <div className="my-6 ">
              <Title text={"All Our Classes"} />
              <p className="mt-2">Numbers of Classes: {classes.length}</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {classes.map((item) => (
                <div
                  key={item?._id}
                  className="overflow-hidden rounded-lg shadow-xl dark:bg-gray-800"
                >
                  <Image
                    className="w-full h-[200px] object-cover"
                    src={item?.image}
                    alt="Image"
                  />
                  <div className="flex flex-col gap-3 px-3 py-8">
                    <div className="flex gap-2">
                      <AiOutlineBook className="items-center text-2xl text-primary" />
                      <h3 className="text-lg"> {item?.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <AiOutlineUser className="items-center text-2xl text-primary" />
                      <h3 className=""> {item?.instructor}</h3>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex gap-2">
                        <MdAirlineSeatLegroomNormal className="items-center text-2xl text-primary" />
                        <p>{item?.seats}</p>
                      </div>
                      <div className="flex gap-2">
                        <BsCurrencyDollar className="items-center text-2xl text-primary" />
                        <p>{item?.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSeltedClass(item)}
                          className="px-2 text-sm font-semibold rounded-lg bg-primary text-textDark"
                          disabled={item?.seats == 0}
                        >
                          Add Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Classes;
