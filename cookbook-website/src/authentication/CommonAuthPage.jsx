import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function CommonAuthPage({
  fields,
  title,
  onSubmit,
  submitName,
  secondaryName = null,
  secondaryLink,
  redirect,
}) {
  const getTextField = (props) => {
    return (
      <div style={{ display: "flex", paddingTop: "10px" }}>
        <Box
          component="div"
          sx={{
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <TextField
            variant="outlined"
            label={props.label}
            type={props.type}
            style={{ width: "250px" }}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </Box>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          // marginLeft: "auto",
          // marginRight: "auto",
          margin: "auto",
          display: "block",
          width: "400px",
          borderStyle: "solid",
          paddingBottom: "45px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{title}</h1>
        {fields.map((f) => getTextField(f))}
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            width: "250px",
            paddingTop: "10px",
          }}
        >
          {secondaryName != null && (
            <div style={{ marginTop: "auto", marginBottom: "auto" }}>
              <Button
                onClick={() => redirect(secondaryLink)}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {secondaryName}
              </Button>
            </div>
          )}
          <div
            style={{
              marginLeft: "auto",
              marginRight: "0",
            }}
          >
            <Button variant="contained" onClick={() => onSubmit()}>
              {submitName}
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
