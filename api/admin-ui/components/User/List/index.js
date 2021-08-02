import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Button, Grid } from "@primer/components";
import TFace from "../../../../api";
function Item({ user, url }) {
  const [loading, setLoading] = useState();
  const clickUpload = async (user) => {
    if (loading) return;
    setLoading(true);
    const { faces = [] } = user;
    const urls = faces.map((face) =>
      encodeURI("https://timekeeping.itoa.vn" + face.file.publicUrl),
    );
    if (urls.length) {
      const tface = new TFace(url);
      console.log("delete", url, urls, user.id);
      await tface.deleteById(user.id);
      console.log("upload", url, urls, user.id);
      await tface.uploadByUrls(urls, user.id);
    }
    setLoading(false);
  };
  return (
    <div style={{ marginBottom: 34 }}>
      <Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
        <Box p={3}>
          <h5>{user.name}</h5>
          <small>{user.id}</small>
          <hr />
          {user.faces.map((face) => {
            return (
              <span key={face.id}>
                {/* <img
              height={50}
              src={`https://timekeeping.itoa.vn/` + face.file.publicUrl}
            /> */}
              </span>
            );
          })}
        </Box>
        <Box p={3} color="text.inverse">
          <Button
            size="xs"
            onClick={(e) => {
              clickUpload(user);
            }}
          >
            {loading ? "loading..." : "upload"}
          </Button>
        </Box>
      </Grid>

      {/* <UserDelete user={user} /> */}
    </div>
  );
}
export default function UserList({ onTrain, url }) {
  const { loading, error, data = {} } = useQuery(
    gql`
      query {
        allUsers {
          id
          name
          isAdmin
          faces {
            id
            file {
              publicUrl
            }
          }
        }
      }
    `,
  );
  const { allUsers = [] } = data;

  const users = useMemo(() => {
    return allUsers.map((user) => {
      return !user.isAdmin && <Item key={user.id} user={user} url={url} />;
    });
  }, [allUsers, url]);

  if (loading) return "Loaing...";
  if (error) return error;

  return (
    <div>
      {users}
      <Button
        onClick={(e) => {
          onTrain(allUsers);
        }}
      >
        train
      </Button>
    </div>
  );
}
