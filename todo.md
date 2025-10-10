# :star: Nice To Have

- [ ] Validering med JWT inloggning

# :hammer: Needs Fixing

- [ ] Just nu skapas en användare i backend varje gång en bokning ska göras. **Problem**: Om en användares mail-address redan existerar så kan inte en ny användare skapas.
    - [ ] **Lösning**: Se till att kolla om användaren redan finns registerad i databasen.
    - [ ] Om användaren redan finns, använd den befintliga användaren istället.

# :red_circle: Felhantering

- [ ] **Inputfältet för Telefonnumer** Måste komma in som **string** och inte som number, det blir **null i databasen**