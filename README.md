### Comandos

* `docker compose up -d node_db`
* `docker compose build`
* `docker compose up`
* `sudo docker exec -it node_db psql -U db_user -d producao_rascunho_db`
* `sudo docker cp data/especiesScript.sql node_db:/tmp/`
* `sudo docker exec -it node_db psql -U db_user -d producao_rascunho_db -f /tmp/especiesScript.sql`


### Constraints

* `ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_embarcacaoId_especieId_key";`
* `ALTER TABLE "producaoEmbarcacaoEspecies" DROP CONSTRAINT "producaoEmbarcacaoEspecies_producaoId_key";`
