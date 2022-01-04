import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderedHistoryScreen() {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
    console.log(orders.data);
  }, [dispatch]);
  return (
    <div>
      <h2>Order History</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DDATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr key={order?.data?._id}>
                <td>{order?._id}</td>
                <td>{order?.createdAt.substring(0, 10)}</td>
                <td>{order?.totalPrice}</td>
                <td>{order?.isPaid ? order?.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order?.isDelivered ? order?.paidAt.substring(0, 10) : "No"}
                </td>
                <td>
                  <button
                    className="small"
                    onClick={() => navigate(`/order/${order?._id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderedHistoryScreen;
