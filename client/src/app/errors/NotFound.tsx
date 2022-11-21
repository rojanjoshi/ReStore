import {Button, Container, Divider, Link, Paper, Typography } from "@mui/material";

export default function NotFound() {
    return (
<div className="p-4">
        <div className="row p-4" style={{border:'1px solid black',height:'500px',background:'white', width:'500px'}}>
           
            <ul className="list-group list-group-flush">
  <li className="list-group-item"><h1>Oops - we could not find what you are looking for</h1></li>
  <li className="list-group-item"><a href="/" className="link-primary">Go back to shop.</a></li>

</ul>
         
           
            
        </div>
        </div>
        // <Container component={Paper} sx={{height: 400}}>
        //     <Typography gutterBottom variant='h3'>Oops - we could not find what you are looking for</Typography>
        //     <Divider />
           
        //     <a href="/" className="link-primary">Go back to shop.</a>
            
        // </Container>
    )
}