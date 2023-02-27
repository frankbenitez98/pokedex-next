import { Button } from "@mui/material";
import React, { CSSProperties, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";
import uiSlice, { setLoading } from "../slices/uiSlice";
import { RootState } from "../store/store";

const HomePage = () => {
  const loading = useSelector((state: RootState) => state.ui.loading);
  console.log(loading);
  const dispatch = useDispatch();
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
  }, []);

  return <>{loading && <Button>loading </Button>}</>;
};
export default HomePage;
