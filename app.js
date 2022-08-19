const numTramosDOM = document.querySelector('#num-tramos')
const botonAnadirDOM = document.querySelector('.añadir')
const contenedorTramosDOM = document.querySelector('.contenedor-tramos')
const tramosDOM = document.querySelector('.tramos')

const mostrarTramos = (numero) => {
	for (let i = 1; i <= numero; i++) {
		contenedorTramosDOM.innerHTML += `
        <fieldset>
            <legend>Tramo ${i}</legend>
            <label for="minutos-${i}">Minutos</label>
            <input type="number" name="minutos-${i}" id="minutos-${i}" class="minutos" />
            <label for="kilometros-${i}">Kilómetros</label>
            <input type="number" name="kilometros-${i}" id="kilometros-${i}" class="kilometros" />
        </fieldset>
    `
	}
	contenedorTramosDOM.innerHTML +=
		'<button class="calcular">Calcular</button>'
	tramosDOM.style.display = 'none'
	document.querySelector('.calcular').addEventListener('click', (e) => {
		e.preventDefault()
		const fieldsetsDOM = document.querySelectorAll('fieldset')
		let informacionTramos = []
		fieldsetsDOM.forEach((fieldset) => {
			const objetoTramo = {
				minutos: parseInt(fieldset.querySelector('.minutos').value),
				kilometros: parseInt(
					fieldset.querySelector('.kilometros').value
				)
			}
			informacionTramos.push(objetoTramo)
		})
		console.log(informacionTramos)
		calcularTotalCalorias(informacionTramos)
	})
}

const calcularTotalCalorias = (arr) => {
	let totalCalorias = 0
	let totalMinutos = 0
	arr.forEach((tramo) => {
		const velocidad = Math.floor((tramo.kilometros * 60) / tramo.minutos)
		if (velocidad <= 16) {
			totalCalorias += 6 * tramo.minutos
			totalMinutos += tramo.minutos
			return
		}
		if (velocidad <= 20) {
			totalCalorias += 7 * tramo.minutos
			totalMinutos += tramo.minutos
			return
		}
		if (velocidad <= 24) {
			totalCalorias += 8 * tramo.minutos
			totalMinutos += tramo.minutos
			return
		}
		if (velocidad > 24) {
			alert('¿Dónde vas, Induráin?')
		}
	})
	console.log(totalCalorias)
	crearTabla(totalMinutos, totalCalorias)
}

const crearTabla = (totalMinutos, totalCalorias) => {
	const calPorHora = Math.floor((totalCalorias * 60) / totalMinutos)
	contenedorTramosDOM.innerHTML = `
		<h2>Calorías quemadas</h2>
		<table>
			<tr>
				<th>Tiempo total transcurrido</th>
				<td>${totalMinutos}</td>
			</tr>
			<tr>
				<th>Total calorías quemadas</th>
				<td>${totalCalorias}</td>
			</tr>
			<tr>
				<th>Calorías por hora</th>
				<td>${calPorHora}</td>
			</tr>
		</table>
		<button class="inicio">Inicio</button>
		<button class="grafico">Ver gfáfico</button>
	`
	document.querySelector('.inicio').addEventListener('click', () => {
		location.reload()
		numTramosDOM.value = ''
	})
}

botonAnadirDOM.addEventListener('click', (e) => {
	e.preventDefault()
	const numTramos = numTramosDOM.value
	// console.log(numTramos)
	mostrarTramos(numTramos)
})
