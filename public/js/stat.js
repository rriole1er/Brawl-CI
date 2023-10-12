class Stat {
    constructor() {
        this.moyAllMonth = [];
        this.allDay = {};
        this.moyAllDay = [];
        this.dataJanvier = [];
        this.dataFevrier = [];
        this.dataMars = [];
        this.dataAvril = [];
        this.dataMai = [];
        this.dataJuin = [];
        this.dataJuillet = [];
        this.dataAout = [];
        this.dataSeptembre = [];
        this.dataOctobre = [];
        this.dataNovembre = [];
        this.dataDecembre = [];
    }

    transformMonth(dateCapture) {   // A partir d'une date donnée, on récupere le mois
        const arrayDateCapture = dateCapture.split(" ");
        const arrayDate = arrayDateCapture[0].split('-');
        return arrayDate[1];
    }

    transformDay(dateCapture) {      // A partir d'une date donnée, on récupere le jour et l'heure 
        const arrayDateCapture = dateCapture.split(" ");
        const arrayDate = arrayDateCapture[0].split('-');
        return [arrayDate[2], arrayDateCapture[1]];
    }

    pushToArrayDateMonth(date, valeur) {        // On insere dans un tableau les données du mois associé
        switch (date) {
            case '1':
                this.dataJanvier.push(valeur);
                break;
            case '2':
                this.dataFevrier.push(valeur);
                break;
            case '3':
                this.dataMars.push(valeur);
                break;
            case '4':
                this.dataAvril.push(valeur);
                break;
            case '5':
                this.dataMai.push(valeur);
                break;
            case '6':
                this.dataJuin.push(valeur);
                break;
            case '7':
                this.dataJuillet.push(valeur);
                break;
            case '8':
                this.dataAout.push(valeur);
                break;
            case '9':
                this.dataSeptembre.push(valeur);
                break;
            case '10':
                this.dataOctobre.push(valeur);
                break;
            case '11':
                this.dataNovembre.push(valeur);
                break;
            case '12':
                this.dataDecembre.push(valeur);
                break;
        }
    }

    pushToArrayDateDay(date, valeur) {
        if (date[0] > 0 && date[0] < 32) {
            const arrayTempo = [date[1], valeur];
            if (!this.allDay[date[0]]) {
                this.allDay[date[0]] = [];
            }
            this.allDay[date[0]].push(arrayTempo);
        }
    }

    pushToArrayYearMoy(arrayMoy) {
        let cpp = 0;
        for (const data of arrayMoy) {
            cpp += data;
        }
        const moy = arrayMoy.length > 0 ? cpp / arrayMoy.length : 0;
        return parseFloat(moy.toFixed(1));
    }

    pushToArrayMonthMoy(arrayMoy) {
        let cpp = 0;
        if (arrayMoy.length === 0) {
            return 0;
        }
        for (const data of arrayMoy) {
            cpp += data;
        }
        const moy = arrayMoy.length > 1 ? cpp / (arrayMoy.length / 2) : 0;
        return moy;
    }

    pushToArrayDayMoy(arrayMoy) {
        let cpp = 0;
        if (arrayMoy[0] === 0) {
            return 0;
        }
        for (let i = 0; i < arrayMoy.length - 2; i++) {
            cpp += arrayMoy[i][1];
        }
        const moy = (arrayMoy.length > 1) ? cpp / (arrayMoy.length - 2) : 0;
        return parseFloat(moy.toFixed(1));
    }

    populateMonthMoy() {
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataJanvier));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataFevrier));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataMars));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataAvril));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataMai));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataJuin));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataJuillet));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataAout));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataSeptembre));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataOctobre));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataNovembre));
        this.moyAllMonth.push(this.pushToArrayYearMoy(this.dataDecembre));
        return this.moyAllMonth;
    }

    populateDayMoy() {
        for (let i = 1; i < 32; i++) {
            if (!this.allDay[i]) {
                this.allDay[i] = [0];
            }
            this.moyAllDay.push(this.pushToArrayDayMoy(this.allDay[i]));
        }
        return this.moyAllDay;
    }

    populateDayAsLabel(NumberDay) {
        if (!this.allDay[NumberDay]) {
            this.allDay[NumberDay] = [0];
        }
        const day = this.allDay[NumberDay];
        const labels = [];
        if (day[0] === 0) {
            labels.push(`{x: 'Pas de donnée', y: 0}`);
        } else {
            for (let i = 0; i < day.length - 2; i++) {
                labels.push(`{x: '${day[i][0]}', y: ${day[i][1]}}`);
            }
        }
        return labels;
    }

    getAllDay() {
        return this.allDay;
    }
}





