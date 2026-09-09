# Acesso Católico — Conceito

> O *quê* e o *porquê* — fonte de verdade da visão. A ordem e os marcos estão em
> [`roadmap.md`](roadmap.md); o detalhe de cada produto em [`produtos/`](produtos/); as decisões
> técnicas em [`decisoes/stack.md`](decisoes/stack.md). O brainstorm original está em
> [`ideias-iniciais.md`](ideias-iniciais.md), mantido intacto.

---

## 1. Em uma frase

Um **portal público católico** — missas, eventos, comunidades e conteúdo por região — que se
sustenta numa **plataforma de gestão**: primeiro para **paróquias**, depois para **comunidades e
seus encontros** (EJC, EAC, ECC, ENVIA-ME, Éfeta…). **A gestão produz o dado; o portal o expõe.**

---

## 2. O problema

**Para o católico comum:** falta um lugar simples para achar horário de missa, confissão e eventos
da sua cidade. A informação vive espalhada em sites de paróquia desatualizados e grupos de WhatsApp.

**Para quem organiza comunidades/encontros:** hoje se opera com **Google Forms + planilha + WhatsApp**.
A informação **some entre uma edição e outra**, não há memória institucional (ela vive na cabeça de
uma pessoa ou numa planilha perdida), e inscrição, pagamento e escalação de servos ficam em
ferramentas que não se conversam.

**A "aspirina" da gestão** (o que sozinho justifica migrar): formulário de inscrição bom + painel que
consolida tudo (inscritos, pagamentos, servos por equipe) + **memória entre edições**. O resto é
"vitamina": bom, mas não é o que faz alguém migrar.

---

## 3. Estratégia

Entregar em **incrementos pequenos**, cada um útil sozinho (projeto tocado por uma pessoa):

1. **Portal público primeiro.** Home + blog + lojinha de afiliados. Rápido de subir, gera audiência
   e receita, constrói a marca — sem depender de nenhum sistema de gestão. É só consumo: **sem login,
   sem multi-tenancy.**
2. **Gestão de paróquias depois.** Cada paróquia mantém os próprios dados (horários de missa,
   confissão, adoração, eventos, contato). Isso **alimenta o portal** com o diretório "onde tem missa"
   — e o dado vem da fonte certa: a própria igreja.
3. **Gestão de comunidades e eventos por fim.** A plataforma completa (inscrições, servos, cronograma,
   financeiro, mercadinho…). Alimenta o portal com comunidades e eventos por região.

**Efeito de rede:** cada camada de gestão produz, sem esforço extra, o dado que o portal expõe. O
portal **cresce sozinho** à medida que paróquias e comunidades entram.

**Multi-tenancy** entra com a gestão (Fase 2 em diante) — isolamento de dados por paróquia e por
comunidade. O portal público não tem tenancy: as pessoas apenas consomem.

---

## 4. Modelo de domínio

O ponto-chave: separar **o que persiste** (paróquia, comunidade, pessoas) **do que é de um evento**
(inscritos e escalação daquela edição).

| Entidade | O que é |
|---|---|
| **Local / Paróquia** | Uma paróquia (ou capela/diocese) num lugar. Mantém horários de missa/confissão/adoração, eventos e contato. **Primeiro nó do portal** (Fase 2). |
| **Movimento / Categoria** | O *template* do que a comunidade é (EJC, EAC, ECC, grupo de oração, pastoral…): vocabulário, grupos padrão, tipos de evento habituais. Catálogo global. |
| **Comunidade** | Uma comunidade num lugar, ligada a uma paróquia/local. **Persiste no tempo.** |
| **Evento** | Algo que a paróquia ou comunidade realiza, com um **tipo** que habilita módulos (ver abaixo). |
| **Pessoa** | Perfil global e único (nome, cidade/estado, habilidades, histórico de participações). |
| **Vínculo** | Liga Pessoa ↔ *tenant* (paróquia ou comunidade) com **papel e permissões**. Pode ser **efetivo** (membro) ou **convidado** (servo escalado de fora). |
| **Grupo / Equipe** | Grupo permanente da comunidade (músicos, capela, cozinha…), que se auto-organiza entre eventos. |
| **Escalação** | Liga Pessoa ↔ Edição ↔ Grupo ↔ Função. Pode ser **vaga em branco** e a pessoa **não precisa ser membro** daquela comunidade. |
| **Inscrição** | Liga Pessoa ↔ Edição como **encontrista** (participante daquela edição). |
| **Lista de espera** | Contatos capturados quando as inscrições estão fechadas, para avisar na abertura. |

### Tipos de evento

Um evento **é** — e habilita módulos — conforme seu **tipo**:

- **Encontro / Retiro** (ex.: "V EJC Ouro Branco"): inscrições, encontristas, escalação, cronograma,
  financeiro, mercadinho, brindes. É uma **edição** (numeração, ~1x/ano).
- **Reunião recorrente** (ex.: grupo de oração toda quinta 19h): recorrência, presença/RSVP e enquetes.
- **Evento público** (ex.: teatro, terço, palestra, quermesse; ou uma missa/evento da paróquia): data
  e local, divulgação no portal, inscrição e escalação **opcionais**.

Mesma ideia do "núcleo genérico + template": o esqueleto é um, o **tipo** liga/desliga módulos.

### Servos ficam na comunidade — a escalação pode ir além dela

O **servo** é uma **Pessoa** com histórico e habilidades. O que pertence a uma **Edição** é a
**Escalação** (quem serviu, em qual grupo/função, naquele encontro) — e ela pode começar com **vagas
em branco** e incluir **pessoas de fora**: servos de outras paróquias/cidades ganham um **vínculo leve
de "servo convidado"** (entram no quadro para reaparecer em edições futuras e preservar o histórico,
sem os direitos de um membro efetivo; o admin pode promovê-los depois). Assim o mesmo servo aparece
atravessando várias edições e comunidades — como funciona de verdade.

### O ciclo de vida da comunidade

```
Pessoa se inscreve como ENCONTRISTA numa edição
        │  participa do encontro
        ▼  (manual — decisão do admin)
Vira MEMBRO da comunidade  → cria um Vínculo
        ▼
Nas próximas edições entra como SERVO → recebe Escalação (equipe/função)
```

Esse ciclo — **encontrista → membro → servo** — é o coração do produto e o que a planilha nunca captou.

### Núcleo genérico + template por movimento

Todo movimento compartilha o mesmo esqueleto (*Evento → participantes + servos-em-equipes + cronograma
+ financeiro + loja*). O que muda entre EJC, EAC e ECC é só a **configuração**: como se chama o
participante, quais as equipes padrão, o cronograma-modelo, o vocabulário. **Adicionar um movimento
novo é preencher um template — não escrever código.**

---

## 5. Papéis e permissões (RBAC)

Princípio central: **papel e permissões pertencem ao Vínculo (Pessoa × tenant), não à pessoa
globalmente.** A mesma pessoa pode ser admin de uma comunidade e apenas servo de outra.

- **Master (plataforma):** você. Vê e edita tudo. Acesso restrito.
- **Admin de paróquia** *(Fase 2)*: mantém a paróquia — horários, eventos, dados, contato.
- **Admin de comunidade** *(Fase 3)*: vê e edita a sua comunidade (módulos, membros, edições) e concede
  permissões. Quem cria uma comunidade vira admin dela.
- **Coordenador de grupo:** permissão de **editar** um grupo específico (dados, escalação, enquetes);
  os demais só **veem**. Escopo *no grupo*, não na comunidade inteira.
- **Membro / Servo:** vê a comunidade e os membros; conforme permissões, vê e/ou edita 0-n módulos.

**Módulos com permissão granular (ver / editar):** Inscrições · Servos & Equipes · Financeiro ·
Mercadinho · Cronograma · Conteúdo · Sorteios. *Exemplo real: o admin põe a Talita no Mercadinho e o
Caio no Financeiro — cada um editando só o seu módulo.*

---

## 6. Monetização — o que mantém tudo gratuito

**O produto é gratuito — e é assim de propósito.** O Acesso Católico nasce em **apoio à comunidade**:
usar o sistema não custa nada a quem organiza nem a quem participa. A sustentação vem de **links de
afiliado de produtos católicos** (Shopee, Amazon…) — um retorno para o projeto que **não sai do bolso de
quem usa**: quem já ia comprar um terço ou uma garrafa compra por ali e, sem gastar a mais, ajuda a manter
tudo no ar. Entra desde a **Fase 1**:

- **Lojinha:** vitrine pública de indicações, por categorias (Terços e Rosários · Vestuário · Garrafas
  e Acessórios · Livros e Bíblias · Medalhas e Imagens · Acessórios de Retiro).
- **Sugestões no Mercadinho** *(Fase 3)*: ao cadastrar itens, aparecem links de afiliado filtrados pela
  categoria do item.
- **Transparência:** deixar claro que comprar por ali ajuda a manter o Acesso Católico gratuito.
  Rascunho: *"As indicações abaixo têm links de afiliado. Comprando por aqui, você ajuda a manter o
  Acesso Católico gratuito. 🙏"*

Assinatura ou taxa por transação **não estão no plano** — cobrar de quem usa contraria o propósito. Se um
dia a manutenção pesar, o caminho é ampliar os afiliados/doação, não pôr o sistema atrás de um paywall.

---

## 7. Considerações que mudam o design

- **Dados sensíveis e menores (LGPD).** EAC é de adolescentes; inscrições pedem restrição alimentar,
  medicação, contato de emergência. Ver a decisão em §8; o mínimo é registrar consentimento e restringir
  quem vê esses campos.
- **Pix e WhatsApp são o padrão** (não boleto e e-mail). Mesmo com registro manual no v1, o design
  assume que pagamento e comunicação acontecem por fora — deixando ganchos para automatizar depois.
- **Multi-tenant a partir da gestão.** Isolamento por paróquia (Fase 2) e por comunidade (Fase 3).

---

## 8. Decisões

- **Nome / identidade** ✅ — "Acesso Católico", domínio `acessocatolico.com.br`.
- **Local / paróquia como entidade** ✅ — entidade de primeira classe desde a **Fase 2** (é o que
  alimenta o portal).
- **Conversão encontrista → membro** ✅ — **manual** por ora (o admin promove quem entra na comunidade).
- **Consentimento de menores** ✅ — **processo manual pelo responsável pela inscrição**. O sistema não
  automatiza a validação; apenas **registra**: quem validou, data e hora, canal (por onde), e o
  responsável que autorizou. Campos sensíveis ficam marcados e com visualização restrita.
- **Reivindicar paróquia/comunidade** ✅ — por **contato (WhatsApp/e-mail)** no v1, sem fluxo
  automatizado de "claim".

*Em aberto (não bloqueiam):* fonte e frescor dos horários de missa — ver [`produtos/paroquias.md`](produtos/paroquias.md).
