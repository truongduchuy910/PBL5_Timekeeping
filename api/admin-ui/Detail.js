import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Grid, Cell } from "@arch-ui/layout";
import { PageTitle } from "@arch-ui/typography";
import DocTitle from "@keystonejs/app-admin-ui/client/components/DocTitle";
import { HeaderInset } from "@keystonejs/app-admin-ui/client/pages/Home/components";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "../node_modules/react-router";
const Account = () => {
  const { data, error, loading } = useQuery(
    gql`
      query {
        allPages {
          id
        }
      }
    `
  );
  if (error) return <pre>error</pre>;
  if (loading) return <pre>loading...</pre>;
  const [page] = data?.allPages;
  console.log(page);
  return page ? (
    <main>
      <DocTitle title="Tài khoản" />
      <Container>
        <HeaderInset>
          <PageTitle></PageTitle>
        </HeaderInset>
        <Grid gap={16}>
          <Redirect to={`/admin/pages/${page?.id}`} />
        </Grid>
      </Container>
    </main>
  ) : (
    <pre>loading...</pre>
  );
};
export default Account;
