import React, { useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  useEffect(() => {
    if (!props.auth) return;
    const currentRole = props.auth.authorities || [];
    props.history.push("/Dashboard");
  }, [props.auth]);
  return <div />;
};

export default connect((state) => {
  return {
    auth: state.auth.auth,
  };
})(Home);
