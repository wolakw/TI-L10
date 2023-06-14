function wyslijAsynchronicznie(url, metoda, typDanych, przesylanyDokument) {
    if (!window.XMLHttpRequest) {
        return null;
    }

    let requester = new XMLHttpRequest();

    metoda = metoda || 'GET';
    typDanych = typDanych || 'text/plain';

    requester.open(metoda, url);
    requester.setRequestHeader('Content-Type', typDanych);
    //requester.send(null);

    // requester.onreadystatechange = function () {
    //     el = document.getElementById("wyniki");
    //     el.style.display = 'block';
    //     el.innerHTML = 'Ładuję dane...';
    //
    //     if (requester.readyState == 4) {
    //         if (requester.status == 200) {
    //             console.log("wszystko ok, status " + requester.status);
    //             el.innerHTML = requester.responseText;
    //         } else {
    //             console.log("błąd o statusie " + requester.status);
    //         }
    //     }
    // }

    // requester.onreadystatechange = function () {
    //     el = document.getElementById("wyniki");
    //     el.style.display = 'block';
    //     el.innerHTML = 'Ładuję dane...';
    //
    //     if (requester.readyState == 4) {
    //         if (requester.status == 200) {
    //             console.log("wszystko ok, status " + requester.status);
    //             let odpowiedz = requester.responseText.split(";");
    //             let rezultat = '';
    //             odpowiedz.forEach(wynik => {
    //                 rezultat += '<div class="lista">' + wynik + '</div>';
    //             });
    //             el.innerHTML = rezultat;
    //         } else {
    //             console.log("błąd o statusie " + requester.status);
    //         }
    //     }
    // }

    // requester.onreadystatechange = function () {
    //     el = document.getElementById("wyniki");
    //     el.style.display = 'block';
    //     el.innerHTML = 'Ładuję dane...';
    //
    //     if (requester.readyState == 4) {
    //         if (requester.status == 200) {
    //             console.log("wszystko ok, status " + requester.status);
    //             let rezultat = '';
    //             let odpowiedzXML = requester.responseXML
    //                 .getElementsByTagName("sugestia");
    //             for (let wynik of odpowiedzXML) {
    //                 rezultat += '<div id="class">' + wynik.firstChild.nodeValue + '</div>';
    //             }
    //             el.innerHTML = rezultat;
    //         } else {
    //             console.log("błąd o statusie " + requester.status);
    //         }
    //     }
    // }

    requester.onreadystatechange = function () {
        el = document.getElementById("wyniki");
        el.style.display = 'block';
        el.innerHTML = 'Ładuję dane...';

        if (requester.readyState == 4) {
            if (requester.status == 200) {
                console.log("wszystko ok, status " + requester.status);
                let odpowiedzTXT = requester.responseText;
                let odpowiedz = JSON.parse(odpowiedzTXT);
                let rezultat = "";
                for (let wynik of odpowiedz.sugestia) {
                    rezultat += '<div id="class">' + wynik + '</div>';
                }
                el.innerHTML = rezultat;
            } else {
                console.log("błąd o statusie " + requester.status);
            }
        }
    }

    requester.send(przesylanyDokument);
    return requester;
}

// function  pobierzSugestie() {
//     let wartosc = document.getElementById("pole").value;
//     wyslijAsynchronicznie("sugestieXML", "POST", "application/x-www-form-urlencoded",
//         "wartosc="+wartosc);
// }

function wybierzSugestie(sugestia) {
    document.getElementById("pole").value = sugestia; // Uzupełnij treść inputa wybraną sugestią
    document.getElementById("wyniki").style.display = "none"; // Ukryj div z wynikami
    document.getElementById("wyniki").innerHTML = ""; // Wyczyść zawartość diva z wynikami
}

function wybierzSugestiejQuery(sugestia) {
    $('#pole2').val(sugestia); // Uzupełnij treść inputa wybraną sugestią
    $('#wyniki2').css("display", "none"); // Ukryj div z wynikami
    $('#wyniki2').html(""); // Wyczyść zawartość diva z wynikami
}

function pobierzSugestie() {
    let poleTekstowe = document.getElementById("pole");
    let wartosc = poleTekstowe.value.trim();

    if (wartosc === "") {
        // Czyść div z wynikami
        let wynikiDiv = document.getElementById("wyniki");
        wynikiDiv.style.display = "none";
        wynikiDiv.innerHTML = "";
        return;
    }

    let wartoscObj = { wartosc: wartosc };
    wyslijAsynchronicznie("sugestie", "POST", "application/json", JSON.stringify(wartoscObj));

}

function  pobierzSugestiejQuery() {
    // let parametry = new Object();
    // parametry.wartosc = $('#pole2').val();

    let poleTekstowe = $('#pole2');
    let wartosc = poleTekstowe.val().trim();

    if (wartosc === "") {
        // Czyść div z wynikami
        let wynikiDiv = $('#wyniki2');
        wynikiDiv.css("display", "none");
        wynikiDiv.html("");
        return;
    }

    let parametry = {
        "wartosc": wartosc
    }

    // let parametry2 = {
    //     "wartosc": $('#pole2').val()
    // }

    $('#wyniki2').css("display", "block").html("");

    $('#wyniki2').html("Ładuję dane...");
    $.ajax( {
        url: 'sugestie',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(parametry),
        contentType: 'application/json',
        success: function (data) {
            $("#wyniki2").html("");
            $.each(data.sugestia, function (index, wynik) {
                $("#wyniki2").append('<div class="lista" onclick="wybierzSugestiejQuery(this.innerHTML)">' + wynik + '</div>');
            })
        },
        error: function (response) {
            console.log("status: " + response.status);
            $("#wyniki2").html("Błąd podczas otwierania danych!");
        }
    });
}