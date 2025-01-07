### Comandos

* `docker compose up -d node_db`
* `docker compose build`
* `docker compose up`
* `sudo docker exec -it node_db psql -U db_user -d producao_rascunho_db`


### Constraints

* `ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_embarcacaoId_especieId_key";`
* `ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_producaoId_key";`
* `ALTER TABLE "producaoEmbarcacaoEspecies" ADD CONSTRAINT unique_producao_embarcacao_especie UNIQUE ("producaoId", "embarcacaoId", "especieId");`
