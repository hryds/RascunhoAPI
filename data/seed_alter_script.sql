INSERT INTO especies ("nomeCientifico", "nomeComum") VALUES
('Thunnus thynnus' ,'Albacora azul') ,
('Thunnus albacares' ,'Albacora laje') ,
('Thunnus alalunga' ,'Albacora branca') ,
('Thunnus obesus' ,'Albacora bandolim') ,
('Thunnus atlanticus' ,'Albacorinha') ,
('Katsuwonus pelamis' ,'Bonito listrado') ,
('Sarda sarda' ,'Sarda') ,
('Auxis thazard' ,'Bonito cachorro') ,
('Acanthocybium solandri' ,'Cavala empige') ,
('Scomberomorus cavalla' ,'Cavala') ,
('Scomberomorus brasiliensis' ,'Serra') ,
('Istiophorus albicans' ,'Agulhão vela') ,
('Makaira nigricans' ,'Agulhão negro') ,
('Kajikia albida' ,'Agulhão branco') ,
('Xiphias gladius' ,'Espadarte') ,
('Tetrapturus pfluegeri' ,'Agulhão verde') ,
('Prionace glauca' ,'Tubarão azul') ,
('Carcharhinus longimanus' ,'Tubarão estrangeiro') ,
('Carcharhinus falciformis' ,'Tubarão lombo-preto') ,
('Isurus oxyrinchus' ,'Mako/ Anequim') ,
('Alopias superciliosus' ,'Tubarão raposa') ,
('Coryphaena hippurus' ,'Dourado');

ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_embarcacaoId_especieId_key";
ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_producaoId_key";