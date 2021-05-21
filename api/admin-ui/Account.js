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
        authenticatedUser {
          id
          email
          name
        }
      }
    `
  );
  return (
    <main>
      <DocTitle title="Tài khoản" />
      <Container>
        <HeaderInset>
          <PageTitle></PageTitle>
        </HeaderInset>
        <Grid gap={16}>
          {!loading && !error && data?.authenticatedUser && (
            <Redirect to={`/admin/users/${data.authenticatedUser?.id}`} />
          )}
        </Grid>
      </Container>
    </main>
  );
};
export default Account;
