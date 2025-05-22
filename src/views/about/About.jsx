import React from "react"

function About() {
  return (
    <main className="mt-24 p-[20px] sm:px-[40px] sm:pr-[5%]">
      <h1 className="text-5xl mb-[15px] h-min sm:text-6xl sm:mb-[20px]">
        Vad är tomma rum?
      </h1>
      <div className="sm:flex justify-between ">
        <div className="max-w-60ch mb-[15px] shrink text-[1.125rem] mr-[100px] text-wrap">
          <p>
            Tomma Rum är en självorganiserad plattform för kulturellt och
            konstnärligt utbyte. Varje sommar arrangerar alla deltagare
            tillsammans en vistelse på en mindre ort i Sverige. Tomma rum
            handlar om att mötas och att skapa nya former av samarbeten mellan
            konstnärer, kulturutövare och lokalbefolkningen på den ort vi
            besöker.
          </p>
          <br />
          <p>
            Tomma rum är öppet för alla som är intresserade av konst, kultur,
            människor och den ort som vi besöker. Konstnärer men även
            arkitekter, poeter, musiker, skribenter, fotografer och skådespelare
            av olika åldrar och nationaliteter deltar i Tomma rum. En speciell
            dynamik uppstår både inom gruppen och i det lokala samarbetet. Vi
            arrangerar utställningar, performance, filminspelningar, offentliga
            samtal med mera. Oväntade möten sker och både värdar och besökare
            stimuleras till nya synvinklar på lokala samarbeten och kulturliv.
          </p>
          <br />
          <p>
            Tomma rum är en ideell förening, som man blir medlem i när man
            deltar i projektet. Föreningens stadgar finns att ladda ner{" "}
            <span className="underline">
              <a href="http://www.tommarum.se/dokument/TOMMA_RUM_STADGAR-2016.pdf">
                här
              </a>
            </span>
            .
          </p>
          <br />
          <p>Hur fungerar det?</p>
          <p>
            Tomma Rum arbetar under året med kommuner i Sverige för att ta fram
            arbetslokaler som deltagare i projektet får nyttja under
            sommarmånaderna, vanligtvis mellan mitten av juni till mitten av
            augusti. Kortare projekt kan också förekomma.
          </p>
          <br />
          <p>
            Vi i Tomma Rum väljer inte deltagare, utan välkomnar alla som vill
            vara med. Vi strävar efter att vara en horisontell organisation. Och
            i det perspektivet är vi ett unikt residens .
          </p>
          <br />
          <p>
            Vi släpper vanligtvis namnet på årets vistelseort i mars och
            bokningarna öppnar under senare delen av april. Du är då välkommen
            att boka in din vistelse.
          </p>
          <br />
          <p>
            Med deltagaravgiften ingår medlemskap i föreningen Tomma Rum som ger
            dig möjlighet att delta i våra aktiviteter året om. Personer under
            18 år kan inte delta i projektet utan målsmans sällskap.
          </p>
          <br />
          <p>
            Ta gärna en titt på vår jubileumskatalog{" "}
            <span className="underline">
              <a href="https://tommarum.se/wp-content/uploads/2016/01/Tomma_rum_Finns_i_Sverige.pdf">
                ”Tomma Rum finns i Sverige”
              </a>
            </span>{" "}
            för att få en inblick i vår aktivitet.
          </p>
          <br />
          <p>
            Om du är privatperson eller kommun, har frågor, förslag eller tips,
            kontakta oss gärna på{" "}
            <span className="underline">
              <a href="mailto:mail@tommarum.se">mail@tommarum.se</a>
            </span>
          </p>
        </div>
        <aside className="flex flex-col items-center flex-shrink-0">
          {" "}
          <img
            src="https://tommarum.se/wp-content/uploads/2025/04/forsa.png"
            alt="a picture of a red industrial building"
            className="w-full max-w-sm h-auto object-cover mb-[10px] "
          />
          <img
            src="https://tommarum.se/wp-content/uploads/2021/08/voxfjarden.png"
            alt="a colorful painting of a landscape depicting a river"
            className="w-full max-w-sm h-auto object-cover mb-[10px]"
          />
          <img
            src="https://tommarum.se/wp-content/uploads/2015/08/wpid-wp-1438869280528.jpeg"
            alt="a picture of a group of people working together on an art project"
            className="w-full max-w-sm h-auto object-cover mb-[10px]"
          />
        </aside>
      </div>
    </main>
  )
}

export default About
