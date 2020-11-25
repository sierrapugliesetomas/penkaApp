export interface Template {
    id?: string;
    name?: string;
    codePenka?: string;
    status?: string; /*/  0 === ready, 1 === end  /*/
    publish?: boolean;
    date?: string;
    bannerUrl?: string;
}
