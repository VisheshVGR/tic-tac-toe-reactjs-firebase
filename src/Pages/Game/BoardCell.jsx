import React from "react";
import Button from '@mui/material/Button';
import Cross from "../../Assets/cross.png"
import Circle from "../../Assets/circle.png"

const board_cell_style = {
    "display": "grid",
    "aspectRatio": "1 / 1",
    "width": "100%",
    "border": "5px solid #FFE79E",
    "placeItems": "center",
}


const BoardCell = ({ cell_data, handleCellClick }) => {

    return (
        <>
            <div style={board_cell_style}>
                {
                    cell_data ?
                        <>
                            {
                                cell_data === "X" ?
                                    <img src={Cross} alt="oval" style={{ width: "100%", height: "100%" }} /> :
                                    <img src={Circle} alt="circle" style={{ width: "70%", height: "70%" }} />
                            }
                        </>
                        :
                        <>
                            <Button onClick={handleCellClick} sx={{ width: "100%", height: "100%" }} />
                        </>
                }
            </div>
        </>
    )
}

export default BoardCell