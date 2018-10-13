# Igra računarske sekcije - Elementalna arena
## O igri
Radi se o jednostavnoj igri napisanoj u JavaScript-u, koristeći p5.js biblioteku. Ideja za igru razrađena je i isprva implementirana unutar 7 sati za Dan otvorenih vrata KSET-a, ali razvoj igre odlučili smo nastaviti, zasada u nedogled.
## Kratki opis
Igrač upravlja čarobnjakom koji može čarati četiri različite vrste elementarnih projektila: vatra, voda, zemlja i zrak. Igrača sa svih strana napadaju golemi, koji su specifičnog elementa. Cilj igre je izdržati što duže protiv navale golema.
	Projektili različito dijeluju na goleme, ovisno o elementu i projektila i golema. Npr. vatreni golem prima jako puno štete kad je pogođen vodenim projektilom i slično. Također, ako igrač greškom pogodi golema projektilom istog elementa, golem će ojačati.
## Mehanika igre
Igrač upravlja čarobnjakom koristeći strelice na tipkovnici (gore, dolje, lijevo, desno te dijagonalno). Pucanje projektila obavlja se koristeći tipke koje odgovaraju slovima "Q", "W", "E" i "R", a te tipke redom odgovaraju elementima vatre, vode, zemlje i zraka. Smjer putanje projektila ovisi o zadnjem smjeru micanja čarobnjaka (ukupno 8 smjerova).
