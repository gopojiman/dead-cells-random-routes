function Biome(name, children) {
    this.name = name;
    this.children = children;
    this.remove_children = function(children_to_remove) {
        this.children = this.children.filter(child => !children_to_remove.includes(child));
    }
}

var Thro_Room, Dere_Dist, High_Peak, 
    Maus     , Guar_Have, Cloc_Room, 
    Undy_Shor, Cave     , Forg_Sepu, Cloc_Towe,
    Frac_Shri, Grav     , Slum_Sanc, Stil_Vill,
    Nest     , Insu_Cryp, Blac_Brid,
    Mora_Bani, Ossu     , Anci_Sewe, Ramp,
    Corr_Pris, Pris_Dept, 
    Dila_Arbo, Toxi_Sewe, Prom_Cond, Pris_Quar;

function initBiomes() {
    Thro_Room = new Biome("Throne Room",                []);
    Dere_Dist = new Biome("Derelect Distillery",        [Thro_Room]);
    High_Peak = new Biome("High Peak Castle",           [Thro_Room]);
    Maus      = new Biome("Mausoleum",                  [High_Peak, Dere_Dist]);
    Guar_Have = new Biome("Guardian's Haven",           [High_Peak, Dere_Dist, Thro_Room]);
    Cloc_Room = new Biome("Clock Room",                 [High_Peak, Dere_Dist]);
    Undy_Shor = new Biome("Undying Shores",             [Maus]);
    Cave      = new Biome("Cavern",                     [Guar_Have, Maus]);
    Forg_Sepu = new Biome("Forgotten Sepulcher",        [Cloc_Room, Guar_Have]);
    Cloc_Towe = new Biome("Clock Tower",                [Cloc_Room]);
    Frac_Shri = new Biome("Fractured Shrines",          [Undy_Shor, Cloc_Towe, Forg_Sepu]);
    Grav      = new Biome("Graveyard",                  [Forg_Sepu, Cave, Undy_Shor]);
    Slum_Sanc = new Biome("Slumbering Sanctuary",       [Cloc_Towe, Forg_Sepu, Cave]);
    Stil_Vill = new Biome("Stilt Village",              [Cloc_Towe, Undy_Shor, Forg_Sepu]);
    Nest      = new Biome("The Nest",                   [Stil_Vill, Frac_Shri, Grav]);
    Insu_Cryp = new Biome("Insufferable Crypt",         [Slum_Sanc, Grav]);
    Blac_Brid = new Biome("Black Bridge",               [Stil_Vill, Frac_Shri, Slum_Sanc]);
    Mora_Bani = new Biome("Morass of the Banished",     [Nest]);
    Ossu      = new Biome("Ossuary",                    [Blac_Brid]);
    Anci_Sewe = new Biome("Ancient Sewers",             [Insu_Cryp]);
    Ramp      = new Biome("Ramparts",                   [Blac_Brid, Insu_Cryp]);
    Corr_Pris = new Biome("Corrupted Prison",           [Anci_Sewe, Ramp]);
    Pris_Dept = new Biome("Prison Depths",              [Ossu, Mora_Bani, Anci_Sewe]);
    Dila_Arbo = new Biome("Dilapidated Arboretum",      [Pris_Dept, Mora_Bani, Ramp]);
    Toxi_Sewe = new Biome("Toxic Sewers",               [Corr_Pris, Ramp, Anci_Sewe]);
    Prom_Cond = new Biome("Promenade of the Condemned", [Pris_Dept, Ossu, Ramp, Mora_Bani]);
    Pris_Quar = new Biome("Prisoner's Quarters",        [Dila_Arbo, Prom_Cond, Toxi_Sewe]);
}

function choice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRoute(biome) {
    if (biome.children.length == 0)
        return biome.name;
    else
        return biome.name + "<br>" + getRoute(choice(biome.children));
}

function printRoute() {
    var prisonOpt   = document.getElementById("prisonOpt"  ).checked;
    var classOpt    = document.getElementById("classOpt"   ).checked;
    var tubeOpt     = document.getElementById("tubeOpt"    ).checked;
    var BSOpt       = document.getElementById("BSOpt"      ).checked;
    var FFOpt       = document.getElementById("FFOpt"      ).checked;
    var BC          = document.getElementById("BC"         ).value;
    var forcedBiome = document.getElementById("forcedBiome").value;
    
    initBiomes();
    
    if (prisonOpt) {
        Prom_Cond.remove_children([Ossu, Ramp, Mora_Bani]);
        Dila_Arbo.remove_children([Mora_Bani, Ramp]);
        Toxi_Sewe.remove_children([Ramp, Anci_Sewe]);
    }
    if (!BSOpt) {
        Pris_Quar.remove_children([Dila_Arbo]);
        Prom_Cond.remove_children([Mora_Bani]);
        Pris_Dept.remove_children([Mora_Bani]);
    }
    if (!FFOpt) {
        Nest     .remove_children([Frac_Shri]);
        Blac_Brid.remove_children([Frac_Shri]);
        Grav     .remove_children([Undy_Shor]);
        Stil_Vill.remove_children([Undy_Shor]);
        Cave     .remove_children([Maus]);
    }
    if (BC < 3) {
        Ramp    .remove_children([Insu_Cryp]);
    }
    if (BC < 2) {
        Slum_Sanc.remove_children([Cave]);
        Forg_Sepu.remove_children([Guar_Have]);
    }
    if (BC < 1) {
        Pris_Dept.remove_children([Anci_Sewe]);
        Corr_Pris.remove_children([Ramp]);
    }
    
    var routeString = "";
    if (classOpt) {
        routeString += ("<b>Class:</b><br>" + 
        choice(["Brutality", "Tactics", "Survival"]) + 
        "<br><br>");
    }
    if (tubeOpt) {
        routeString += ("<b>Recycling Tube:</b><br>" + 
        choice([1, 2, 3, 4]) + 
        "<br><br>");
    }
    routeString += "<b>Route:</b><br>";
    var route = getRoute(Pris_Quar);
    if (forcedBiome) {
        for(var i = 0; !route.includes(forcedBiome); i++) {
            route = getRoute(Pris_Quar);
            if(i >= 1000) {
                route = "Error: No Route Found";
                break;
            }
        }
    }
    routeString += route;

    document.getElementById("route").innerHTML = routeString;
}