import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, Fragment } from "react";
import { PageTitle } from "../node_modules/@arch-ui/typography";
import DocTitle from "../node_modules/@itoa/app-admin-ui/client/components/DocTitle";
import { HeaderInset } from "../node_modules/@itoa/app-admin-ui/client/pages/Home/components";
import { Container, Grid, Cell } from "@arch-ui/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { FacebookProvider, CustomChat } from "react-facebook";

const Dashboard = () => {
  const [current, setCurrent] = useState({ value: null });
  const [done, setDone] = useState({ value: null });

  const { data, error, loading, refetch } = useQuery(
    gql`
      query {
        allProductOrderStatuses {
          id
          value
          color
        }
      }
    `,
    {
      pollInterval: 3000,
    }
  );

  if (loading || error) return "Đang tải...";
  const { allProductOrders, allProductOrderStatuses, all } = data;
  // const onClickMore = () => {
  //   fetchMore({
  //     variables: { skip: data.allProductOrders.length },
  //     updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
  //       return {
  //         ...previousResult,
  //         // Add the new allProductOrders data to the end of the old allProductOrders data.
  //         allProductOrders: [
  //           ...previousResult.allProductOrders,
  //           ...fetchMoreResult.allProductOrders,
  //         ],
  //       };
  //     },
  //   });
  // };
  return (
    <main>
      <FacebookProvider appId="145518257438217" chatSupport>
        <CustomChat pageId="106614338147778" minimized={false} />
      </FacebookProvider>
      <DocTitle title="Trang chủ" />

      <Container>
        <HeaderInset>
          <PageTitle>Trang chủ</PageTitle>
        </HeaderInset>

        <Grid>
          <Cell width={6}>
            <Status
              allProductOrderStatuses={allProductOrderStatuses}
              setCurrent={setCurrent}
              pre={"Chưa"}
            />

            <All
              refetch={refetch}
              allProductOrderStatuses={allProductOrderStatuses}
              ProductOrderWhereInput={{
                status_none: {
                  value: current.value,
                },
              }}
            />
          </Cell>
          <Cell width={6}>
            <Status
              allProductOrderStatuses={allProductOrderStatuses}
              setCurrent={setDone}
              pre={"Đã"}
            />
            <All
              refetch={refetch}
              allProductOrderStatuses={allProductOrderStatuses}
              ProductOrderWhereInput={{
                status_some: {
                  value: done.value,
                },
              }}
            />
          </Cell>
        </Grid>
        <style jsx="true">{`
          td {
            padding-left: 13px;
            padding-right: 13px;
          }
          label {
            color: #888;
          }
        `}</style>
      </Container>
    </main>
  );
};
export default Dashboard;
function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
      // +      " đ"
    );
  } catch (e) {}
}

const Status = ({ pre, allProductOrderStatuses, setCurrent = () => {} }) => {
  return (
    <div
      className="py-3"
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
      }}
    >
      {allProductOrderStatuses?.map((status) => {
        return (
          <span
            key={status.id}
            className="me-3"
            onClick={() => [setCurrent(status)]}
            style={{ cursor: "pointer" }}
          >
            <span className={`badge bg-${status.color || `secondary`}`}>
              {pre} {status.value}
            </span>
          </span>
        );
      })}
    </div>
  );
};
const All = ({ ProductOrderWhereInput, allProductOrderStatuses }) => {
  const [deleteProductOrder] = useMutation(gql`
    mutation($id: ID!) {
      deleteProductOrder(id: $id) {
        id
      }
    }
  `);
  const [updateProductOrder] = useMutation(gql`
    mutation($id: ID!, $data: ProductOrderUpdateInput) {
      updateProductOrder(id: $id, data: $data) {
        id
      }
    }
  `);
  var first = 5,
    skip = 0;
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, error, loading, refetch, fetchMore } = useQuery(
    gql`
      query($first: Int, $skip: Int, $condition: ProductOrderWhereInput) {
        allProductOrders(
          first: $first
          skip: $skip
          sortBy: updatedAt_DESC
          where: $condition
        ) {
          id
          contact {
            phone
            name
            address
          }
          items {
            id
            product {
              name
            }
            quantity
            sale
            price
          }
          payment
          updatedAt
          status {
            id
            value
            color
          }
        }
      }
    `,
    {
      variables: {
        condition: ProductOrderWhereInput,
        first,
        skip,
      },
      pollInterval: 1500,
    }
  );
  if (loading || error) return "Đang tải...";
  const { allProductOrders } = data;
  const onClickMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: { skip: data.allProductOrders.length },
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        setLoadingMore(false);
        return {
          ...previousResult,
          // Add the new allProductOrders data to the end of the old allProductOrders data.
          allProductOrders: [
            ...previousResult.allProductOrders,
            ...fetchMoreResult.allProductOrders,
          ],
        };
      },
    });
  };
  return (
    <Fragment>
      {allProductOrders?.map((order) => {
        var count = 30000;
        order.items.map((item) => {
          count += item.sale || item.price;
        });
        return (
          <div key={order.id} style={{ marginBottom: 34 }}>
            <p className="me-2">
              📆 {new Date(order.updatedAt).toLocaleString()}
            </p>
            <p>
              <span className="me-2">👤 {order.contact.name}</span>
              <span className="me-2">☎️ {order.contact.phone}</span>
            </p>
            <p className="me-2">📌 {order.contact.address}</p>
            {order?.items.map((item) => {
              return (
                <p key={item.id}>
                  <span>{item.quantity} </span>
                  <span> {item.product.name} </span>
                  <span>
                    {formatMoney(
                      item.quantity * (item.sale ? item.sale : item.price)
                    )}
                  </span>
                </p>
              );
            })}
            <p>
              <span>💰 {formatMoney(count)}</span>
              <span>💵 {order.payment}</span>
            </p>

            {allProductOrderStatuses?.map((status) => {
              return !order.status.find((s) => s.id === status.id) ? (
                <button
                  key={status.id}
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={async () => {
                    await updateProductOrder({
                      variables: {
                        id: order.id,
                        data: { status: { connect: { id: status.id } } },
                      },
                    });
                    await refetch();
                  }}
                >
                  {status.value}
                </button>
              ) : (
                <span
                  key={status.id}
                  className="me-3"
                  style={{ cursor: "pointer" }}
                >
                  <span className={`badge bg-${status.color || `secondary`}`}>
                    Đã {status.value}
                  </span>
                </span>
              );
            })}
            <a
              className="btn-sm btn-outline-danger"
              onClick={async () => {
                await deleteProductOrder({ variables: { id: order.id } });
                refetch();
              }}
            >
              xóa
            </a>
          </div>
        );
      })}
      {!loadingMore && (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            onClickMore();
          }}
        >
          Xem thêm
        </button>
      )}
    </Fragment>
  );
};
