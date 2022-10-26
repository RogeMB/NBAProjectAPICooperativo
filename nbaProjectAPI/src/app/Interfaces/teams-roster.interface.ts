// Generated by https://quicktype.io

export interface TeamsRosterResponse {
    _internal: Internal;
    league:    League;
}

export interface Internal {
    pubDateTime:             string;
    igorPath:                string;
    xslt:                    string;
    xsltForceRecompile:      string;
    xsltInCache:             string;
    xsltCompileTimeMillis:   string;
    xsltTransformTimeMillis: string;
    consolidatedDomKey:      string;
    endToEndTimeMillis:      string;
}

export interface League {
    standard:   RosterDetail;
    africa:     RosterDetail;
    sacramento: RosterDetail;
    vegas:      RosterDetail;
    utah:       RosterDetail;
}

export interface RosterDetail {
    teamId:  string;
    players: Player[];
}

export interface Player {
    personId: string;
}
