package pk.wieik.ti.ti;

import java.io.*;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import pk.wieik.ti.ti.model.Narzedzia;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        ServletContext context = getServletContext();
        String szablon = Narzedzia.pobierzSzablon("index.html", context);
        PrintWriter out = response.getWriter();

        out.println(szablon);
    }
    public void destroy() {
    }
}