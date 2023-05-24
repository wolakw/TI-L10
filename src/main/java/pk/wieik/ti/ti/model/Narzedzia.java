package pk.wieik.ti.ti.model;

import jakarta.servlet.ServletContext;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class Narzedzia {
    public static String pobierzSzablon(String plik, ServletContext context) throws IOException {
        StringBuffer wyjscie = new StringBuffer("");
        String tekst = "";
        InputStream is = context.getResourceAsStream("/WEB-INF/widok/" + plik);
        if (is != null) {
            InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
            BufferedReader reader = new BufferedReader(isr);
            while ((tekst = reader.readLine()) != null) {
                wyjscie.append(tekst).append("\n");
            }
        } else wyjscie.append("Brak pliku " + plik);
        return wyjscie.toString();
    }
}
