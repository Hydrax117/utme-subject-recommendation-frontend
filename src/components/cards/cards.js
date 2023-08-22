import styled from "styled-components";
export const Card = ({ card_title, card_text }) => {
  return (
    <div style={{ background: "white" }}>
      <p style={{ textAlign: "center", fontSize: "34px" }}>{card_title}</p>
    </div>
  );
};
