import React, { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@primer/components";

export default function UserList({ onTrain }) {
  const { loading, error, data = {} } = useQuery(
    gql`
      query {
        allUsers {
          id
          name
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
      return (
        <div key={user.id}>
          <h5>{user.name}</h5>
          {user.faces.map((face) => {
            return (
              <span key={face.id}>
                <img height={50} src={face.file.publicUrl} />
              </span>
            );
          })}
          {/* <UserDelete user={user} /> */}
        </div>
      );
    });
  }, [allUsers]);

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
