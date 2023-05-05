const express = require('express');

const app = express();

const path=require("path")


// app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'))
app.use(express.json())


app.post('/multiplicar', (req,res) => {
  const num_1= req.body.numb_1
  const num_2= req.body.numb_2
  const num_3= req.body.numb_3
  const num_4= req.body.numb_4
  const matA=req.body.matrizA
  const matB=req.body.matrizB
  const matrix=req.body.matrizR
  
  console.log(num_1)
  console.log(num_2)
  console.log(matA)
  console.log(matB)
  console.log(matrix)





// alert("pase el body")


  function Multiplicar () {

      // Inicializar ()
      for (i=0; i < num_1; i++){
          for (j=0; j < num_4; j++){
              let suma=0
          for (k=0; k < num_2; k++){
                  suma += matA[i][k]*matB[k][j];
                  matrix[i][j]=suma
              }
          }
      }
      return matrix
  }
  
  Multiplicar()
  
  let result=Object.values(matrix)
 
  return res.json({  
  resultado: result

  })
})


app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});
