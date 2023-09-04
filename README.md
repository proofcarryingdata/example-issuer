<p align="center">
    <h1 align="center">
        PCD Issuer
    </h1>
</p>

| This monorepo contains a sample client and server to demonstrate the PCD SDK usage for issuing a PCD with a PCD passport. |
| ------------------------------------------------------------------------------------------------------------------------- |

## 🖼 Context

Proof-Carrying Data (PCD) is a self-contained, independent entity of data carrying sufficient information to be verified and interpreted by a consumer without reliance on exchanges between the producer and consumer. It comprises two primary components: the 'claim,' a straightforward statement (dubbed 'facts'), and the 'proof,' proving the truth of the statement by mathematical or cryptographic means. The elegance lies in the fact that no external information is necessary for validation; everything essential resides within. PCDs have the potential to revolutionize data handling. Envision a world where data flows unrestricted, free from the confinement of silos. PCDs can restore data ownership to individuals, facilitating portability across platforms, and removing barriers. PCD Issuers, whether your bank or Reddit, offer data imbued with cryptography or math (think Merkle Trees and signatures). You can blend it with your private data, creating your unique PCD. Any third-party application (PCD Consumer), from social networks to lending services, can wield this PCD as a key to unlock their services.

## ▶️ Workflow

Now, let's embark on a step-by-step journey to harness the potential of Proof-Carrying Data (PCD) utilizing EdDSA PCDs. In this scenario, a PCD comprises a 'claim,' represented as a simple message (the name of your chosen color), and a 'proof' (a signature) crafted by the PCD Issuer's confidential EdDSA key.

### Step 1: Prepare Your PCD Passport
Before delving into PCDs, ensure you have a valid PCD Passport identity instance. Your PCD Passport can accommodate multiple identities, each potentially carrying several PCDs (akin to attestations). You can efficiently manage these identities using the [zupass](https://github.com/proofcarryingdata/zupass/) PCD Passport.

### Step 2: Request a PCD from the PCD Issuer
Here's where the magic begins. You'll interact with the PCD Issuer implemented in this repository to get a PCD attesting to a signature on your chosen color name message. The process unfolds as follows:

1. The PCD Issuer takes your message and, like a digital wizard, applies its private EdDSA key to create a signature.
2. The Issuer returns the serialized PCD, a package of your 'claim' (the color name) and its corresponding 'proof' (the signature).
3. The client, thanks to the PCD SDK, seamlessly adds this PCD to your Passport.

Now, you've got your 'claim' (the color name) and 'proof' (signature) neatly stored and ready for the next step.

### Step 3: Interact with the PCD Consumer
With your PCD secured in your Passport, it's time to interact with the PCD Consumer, aptly named [example-consumer](https://github.com/proofcarryingdata/example-consumer). This step allows you to unlock the true potential of your PCD. Here's how it unfolds:

1. The PCD Consumer client diligently checks if the 'proof' match with the 'claim.' It does this by asking your PCD from your Passport.
2. The client initiates a challenge, verifying the PCD against the public key to check the validity of the EdDSA signature.
3. If the PCD proves its correctness, you gain access to the consumer features.

Among these features might be the ability to change the background color of the client interface to match the color specified in your original message.

## 🛠 Install

Use this repository as a Github [template](https://github.com/proofcarryingdata/example-issuer/generate).

Clone your repository:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
```

and install the dependencies:

```bash
cd <your-repo> && yarn
```

## 📜 Usage

To run everything, you must have a local instance of the [zupass](https://github.com/proofcarryingdata/zupass/) PCD Passport on your machine. Follow this [guide](https://github.com/proofcarryingdata/zupass/#for-developers-local-development) to get it running correctly.

Copy the `.env.example` file as `.env` and add your environment variables:

```bash
cp .env.example .env
```

Run the following command to build (client + server):

```sh
yarn build
```

Run the following command to start the application (client + server):

```bash
yarn start
```