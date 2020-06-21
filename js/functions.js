function canvas(){ 
    const canvas = document.getElementById('hangman');
    const context = canvas.getContext("2d");

    clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    }

    Horca = () => { 
    context.strokeStyle = 'whitesmoke';
    context.lineWidth = 10; 
    context.beginPath();
    //base
    context.moveTo(175, 225);
    context.lineTo(5, 225);
    //palo principal
    context.moveTo(40, 225);
    context.lineTo(25, 5);
    context.lineTo(100, 5);
    context.lineTo(100, 25);
    //palito diagonal
    context.moveTo(30, 55);
    context.lineTo(50, 5);
    context.stroke();}

    Horca();
    Draw = (part) => {
    switch (part) {
        case 'head':
            context.lineWidth = 5;
            context.beginPath();
            context.arc(100, 50, 25, 0, Math.PI*2, true);
            context.closePath();
            context.stroke();
            break;
        
        case 'body':
            context.beginPath();
            context.moveTo(100, 75);
            context.lineTo(100, 140);
            context.stroke();
            break;

        case 'rightHarm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(60, 100);
            context.stroke();
            break;

        case 'leftHarm':
            context.beginPath();
            context.moveTo(100, 85);
            context.lineTo(140, 100);
            context.stroke();
            break;

        case 'rightLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(80, 190);
            context.stroke();
            break;

        case 'rightFoot':
            context.beginPath();
            context.moveTo(82, 190);
            context.lineTo(70, 185);
            context.stroke();
        break;

        case 'leftLeg':
            context.beginPath();
            context.moveTo(100, 140);
            context.lineTo(125, 190);
            context.stroke();
        break;

        case 'leftFoot':
            context.beginPath();
            context.moveTo(122, 190);
            context.lineTo(135, 185);
            context.stroke();
        break;
    } 
    }

    const draws = [ 
    'head', 
    'body', 
    'rightHarm', 
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
    ]
    var step = 0;


    const next = document.getElementById('next')

    next.addEventListener('click', function() {
    Draw(draws[step++])
    if (undefined === draws[step]) this.disabled = true;
    });

    document.getElementById('reset').addEventListener('click', function() {
    clearCanvas()
    Horca()
    step = 0
    next.disabled = false
    })
}

var palabras  = ['Milanesa', 'Pure', 'Pollo', 'Hamburguesa', 'Papas Fritas', 'Pizza', 'Chivito', 'Deadpool', 'Spiderman', 'Transformers', 'Starwars', 'Avengers', 'Los juegos del Hambre', 'Harry Potter'];
var pistas = ['Carne enpanizada', 'Suave y Blanco', '', 'Carne redonda al pan', 'Bastones fritos', 'Masa redonda con salsa', 'Carne al pan', '', 'Araña', 'Robots', 'Naves Espaciales', 'Superheroes', '', 'Magia'];

var adivinar ="";

function generaPalabra() {
    var rand = (Math.random() * 14).toFixed(0);
    adivinar = palabras[rand].toUpperCase();
    console.log(adivinar);
  }
  function pistaPalabra() {
    document.getElementById("Pista").innerHTML = pistas[rand];
  }
  function guiones() {
  var num = adivinar.length;
  for (var i = 0; i < num; i++) {
    document.getElementById("guiones").innerHTML = "_";
  }
}