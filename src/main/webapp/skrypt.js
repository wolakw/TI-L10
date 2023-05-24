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

function  pobierzSugestie() {
    let wartosc = { wartosc: document.getElementById("pole").value };
    wyslijAsynchronicznie("sugestie", "POST", "application/json", JSON.stringify(wartosc));
}

function  pobierzSugestiejQuery() {
    let parametry = new Object();
    parametry.wartosc = $('#pole2').val();

    let parametry2 = {
        "wartosc": $('#pole2').val()
    }

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
                $("#wyniki2").append('<div class="lista">' + wynik + '</div>');
            })
        },
        error: function (response) {
            console.log("status: " + response.status);
            $("#wyniki2").html("Błąd podczas otwierania danych!");
        }
    });
}