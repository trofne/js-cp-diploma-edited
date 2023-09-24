const selectedSeance = JSON.parse(localStorage.selectedSeance);

let places = selectedSeance.salesPlaces.map(({ row, place }) => `${row}/${place}`).join(", ");
let price = selectedSeance.salesPlaces.reduce((total, { type }) => {
	if (type === "standart") {
		return total + Number(selectedSeance.priceStandart);
	} else {
		return total + Number(selectedSeance.priceVip);
	}
}, 0);

document.querySelector(".ticket__title").innerHTML = selectedSeance.filmName;
document.querySelector(".ticket__chairs").innerHTML = places;
document.querySelector(".ticket__hall").innerHTML = selectedSeance.hallName;
document.querySelector(".ticket__start").innerHTML = selectedSeance.seanceTime;
document.querySelector(".ticket__cost").innerHTML = price;

const newHallConfig = selectedSeance.hallConfig.replace(/selected/g, "taken");
document.querySelector(".acceptin-button").addEventListener("click", (event) => {
	event.preventDefault();
	fetch("https://jscp-diplom.netoserver.ru/", {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `event=sale_add&timestamp=${selectedSeance.seanceTimeStamp}&hallId=${selectedSeance.hallId}&seanceId=${selectedSeance.seanceId}&hallConfiguration=${newHallConfig}`,
	});
});
