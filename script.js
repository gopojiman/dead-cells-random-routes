function Biome(name, children) {
    this.name = name;
    this.children = children;
    this.remove_children = function(children_to_remove) {
        this.children = this.children.filter(child => !children_to_remove.includes(child));
    }
}

var The_Crow ,
    Ligh     , Thro_Room, Mast_Keep,
    Infe_Ship, Dere_Dist, High_Peak, Drac_Cas2,
    Maus     , Guar_Have, Cloc_Room, 
    Undy_Shor, Cave     , Forg_Sepu, Cloc_Towe,
    Frac_Shri, Grav     , Slum_Sanc, Stil_Vill,
    Nest     , Insu_Cryp, Blac_Brid, Defi_Necr,
    Mora_Bani, Ossu     , Anci_Sewe, Ramp,      Drac_Cas1,
    Corr_Pris, Pris_Dept, 
    Dila_Arbo, Toxi_Sewe, Prom_Cond, Cast_Outs,
    Pris_Quar;

function initBiomes() {
    The_Crow  = new Biome("The Crown",                  []);

    Mast_Keep = new Biome("Master's Keep",              []);
    Thro_Room = new Biome("Throne Room",                []);
    Ligh      = new Biome("Lighthouse",                 [The_Crow]);

    Drac_Cas2 = new Biome("Dracula's Castle",           [Mast_Keep]);
    Infe_Ship = new Biome("Infested Shipwreck",         [Ligh]);
    Dere_Dist = new Biome("Derelect Distillery",        [Thro_Room, Ligh]);
    High_Peak = new Biome("High Peak Castle",           [Thro_Room, Mast_Keep]);

    Maus      = new Biome("Mausoleum",                  [High_Peak, Dere_Dist, Infe_Ship, Drac_Cas2]);
    Guar_Have = new Biome("Guardian's Haven",           [High_Peak, Dere_Dist, Thro_Room, Infe_Ship, Drac_Cas2]);
    Cloc_Room = new Biome("Clock Room",                 [High_Peak, Dere_Dist, Infe_Ship, Drac_Cas2]);

    Undy_Shor = new Biome("Undying Shores",             [Maus]);
    Cave      = new Biome("Cavern",                     [Guar_Have, Maus]);
    Forg_Sepu = new Biome("Forgotten Sepulcher",        [Cloc_Room, Guar_Have]);
    Cloc_Towe = new Biome("Clock Tower",                [Cloc_Room]);

    Frac_Shri = new Biome("Fractured Shrines",          [Undy_Shor, Cloc_Towe, Forg_Sepu]);
    Grav      = new Biome("Graveyard",                  [Forg_Sepu, Cave, Undy_Shor]);
    Slum_Sanc = new Biome("Slumbering Sanctuary",       [Cloc_Towe, Forg_Sepu, Cave]);
    Stil_Vill = new Biome("Stilt Village",              [Cloc_Towe, Undy_Shor, Forg_Sepu]);

    Defi_Necr = new Biome("Defiled Necropolis",         [Stil_Vill, Slum_Sanc, Grav]);
    Nest      = new Biome("The Nest",                   [Stil_Vill, Frac_Shri, Grav]);
    Insu_Cryp = new Biome("Insufferable Crypt",         [Slum_Sanc, Grav]);
    Blac_Brid = new Biome("Black Bridge",               [Stil_Vill, Frac_Shri, Slum_Sanc]);

    Drac_Cas1 = new Biome("Dracula's Castle",           [Blac_Brid, Defi_Necr]);
    Mora_Bani = new Biome("Morass of the Banished",     [Nest]);
    Ossu      = new Biome("Ossuary",                    [Blac_Brid, Defi_Necr]);
    Anci_Sewe = new Biome("Ancient Sewers",             [Insu_Cryp]);
    Ramp      = new Biome("Ramparts",                   [Blac_Brid, Insu_Cryp]);

    Corr_Pris = new Biome("Corrupted Prison",           [Anci_Sewe, Ramp, Drac_Cas1]);
    Pris_Dept = new Biome("Prison Depths",              [Ossu, Mora_Bani, Anci_Sewe]);

    Cast_Outs = new Biome("Castle Outskirts",           [Ossu, Drac_Cas1, Corr_Pris]);
    Dila_Arbo = new Biome("Dilapidated Arboretum",      [Pris_Dept, Mora_Bani, Ramp]);
    Toxi_Sewe = new Biome("Toxic Sewers",               [Corr_Pris, Ramp, Anci_Sewe, Drac_Cas1]);
    Prom_Cond = new Biome("Promenade of the Condemned", [Pris_Dept, Ossu, Ramp, Mora_Bani]);

    Pris_Quar = new Biome("Prisoner's Quarters",        [Dila_Arbo, Prom_Cond, Toxi_Sewe, Cast_Outs]);
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

function isRouteLegal(route, forcedBiome) {
    if (forcedBiome && !route.includes(forcedBiome))
        return false;
    // Cannot go through Dracula's Castle twice
    if (route.indexOf("Dracula's Castle") != route.lastIndexOf("Dracula's Castle"))
        return false;
    return true;
}

function printRoute() {
    var classOpt    = document.getElementById("classOpt"   ).checked;
    var tubeOpt     = document.getElementById("tubeOpt"    ).checked;
    var BSOpt       = document.getElementById("BSOpt"      ).checked;
    var FFOpt       = document.getElementById("FFOpt"      ).checked;
    var QSOpt       = document.getElementById("QSOpt"      ).checked;
    var RCOpt       = document.getElementById("RCOpt"      ).checked;
    var BC          = document.getElementById("BC"         ).value;
    var prisonOpt   = document.getElementById("prisonOpt"  ).value;
    var forcedBiome = document.getElementById("forcedBiome").value;
    
    initBiomes();
    
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
    if (!QSOpt) {
        Maus     .remove_children([Infe_Ship]);
        Guar_Have.remove_children([Infe_Ship]);
        Cloc_Room.remove_children([Infe_Ship]);
        Dere_Dist.remove_children([Ligh]);
    }
    if (!RCOpt) {
        Pris_Quar.remove_children([Cast_Outs]);
        Toxi_Sewe.remove_children([Drac_Cas1]);
        Corr_Pris.remove_children([Drac_Cas1]);
        Ossu     .remove_children([Defi_Necr]);
        Maus     .remove_children([Drac_Cas2]);
        Cloc_Room.remove_children([Drac_Cas2]);
        Guar_Have.remove_children([Drac_Cas2]);
        High_Peak.remove_children([Mast_Keep]);
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

    if (prisonOpt === "Guaranteed") {
        Prom_Cond.remove_children([Ossu, Ramp, Mora_Bani]);
        Dila_Arbo.remove_children([Mora_Bani, Ramp]);
        Toxi_Sewe.remove_children([Ramp, Anci_Sewe, Drac_Cas1]);
        Cast_Outs.remove_children([Ossu, Drac_Cas1]);
    }
    else if (prisonOpt === "Excluded") {
        Prom_Cond.remove_children([Pris_Dept]);
        Dila_Arbo.remove_children([Pris_Dept]);
        Toxi_Sewe.remove_children([Corr_Pris]);
        Cast_Outs.remove_children([Corr_Pris]);
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

    for(var i = 0; !isRouteLegal(route, forcedBiome); i++) {
        route = getRoute(Pris_Quar);
        if(i >= 1000) {
            route = "Error: No Route Found";
            break;
        }
    }
    routeString += route;

    document.getElementById("route").innerHTML = routeString;
}
