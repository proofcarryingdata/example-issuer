<p align="center">
    <h1 align="center">
        PCD Issuer
    </h1>
</p>

| This monorepo contains a client/server boilerplate to demonstrate the PCD SDK usage for issuing an EdDSA PCD in the PCD passport. |
| --------------------------------------------------------------------------------------------------------------------------------- |

## 🖼 Context

Proof-Carrying Data (PCD) is a self-contained, independent entity of data carrying sufficient information to be verified and interpreted by a consumer without reliance on exchanges between the issuer and consumer. The two primary components are the _claim_, a straightforward statement (dubbed 'facts'), and the _proof_, proving the truth of the statement by mathematical or cryptographic means. No external information is necessary for validation; everything essential resides within, potentially revolutionizing data management: envisioning a world where data flows unrestricted, free from the confinement of silos, restoring data ownership to individuals, facilitating portability across platforms, and removing barriers. Think about your bank or Reddit as a PCD _Issuer_, offering data imbued with cryptography or math (as Merkle Trees and signatures). Then, you can blend it with your private data, creating your unique PCD. Any third-party PCD _Consumer_ application, from social networks to lending services, can wield the PCD as an unobjectionable attestation to unlock their services.

## 🧪 EdDSA PCD Demo

Now, let's embark on a step-by-step journey to harness the potential of Proof-Carrying Data (PCD). The purpose of this demonstration is to emphasize the way and extent of integration of PCD EdDSA via the PCD SDK. We are going to leverage two basic implementations of PCD Issuer ([`example-issuer`](https://github.com/proofcarryingdata/example-issuer)) and PCD Consumer ([`example-consumer`](https://github.com/proofcarryingdata/example-consumer)), both contained in a single monorepo (_client_ and _server_ applications). In this case, you can interact with the PCD Issuer to request a PCD on an EdDSA signature on a message (color of your choice) while the PCD Consumer can verify the PCDs (signature on the color of your choice) and subsequently change the background color of the client accordingly to the color in the PCD message. Summarizing, a PCD comprises a _claim_, in the form of a simple message (the name of your chosen color), and a _proof_ (a signature) crafted through a confidential EdDSA key from the PCD Issuer on the message (color).

### Step 1: Prepare Your PCD Passport
Before delving into PCDs, ensure you have the PCD Passport up and running. You must register using an email on PCD Passport to accommodate multiple PCDs. You can efficiently manage these identities using [zupass](https://github.com/proofcarryingdata/zupass/) as PCD Passport. 

1. Follow the [Local Development](https://github.com/proofcarryingdata/zupass/#for-developers-local-development) section to run your own PCD Passport instance.

2. Navigate to `localhost:3000`. You should be able the same page as represented below.

![PCD Pass](https://bafybeicrrm2sz3tvmvns64hl4yoynegp7sm7cvalgvfumjr4qet7pykqaa.ipfs.w3s.link/pcdPassHome.png)

3. Enter an email (e.g., `demo@pcd.com`) and click on _Generate Pass_. At the end of the process, you should see the following screen. 

![PCD Pass Identity](https://bafybeiarhkprci3tzvdp2cf6e4634pracr6pn5mr7y54upmqi5imtbitya.ipfs.w3s.link/pcdPassIdentity.png)

Finally, you are now set up and ready to interact with the PCD Issuer client.

### Step 2: Request a PCD from the PCD Issuer
Here's where the magic begins. You can now interact with the PCD Issuer (`example-issuer`) to get a PCD attesting to a signature on your message (chosen color). The process unfolds as follows:

0. Follow the [🛠 Install](#install) and [📜 Usage](#usage) instructions in this repository. You should have the _client_ (`localhost:1234`) and _server_ (`localhost:3005`) up and running at the end of the process.
1. Navigate through the client. Select a color (e.g., Yellow) and press the button (`Add a PCD Signature with your color`). This will open a popup to interact with your PCD Pass as follows.

![Issuer Client Popup](https://bafybeiebuxjmt2yptu36y2wkr6flqgjpy76zh27fig3fqa6x5xn2wrsf7u.ipfs.w3s.link/issuerClientPopup.png)

2. The PCD Issuer takes your message and, like a digital wizard, applies its private EdDSA key to create a signature. By clicking the `Add` button, the PCD is going to be added to your Passport. In fact, by browsing the Passport you should see the following.

![PCD Pass EdDSA PCD](https://bafybeida4zaekqym5sx4qfxhnobshthskmcsd6tlfuvp5xhhohp5o5vh5e.ipfs.w3s.link/pcdPassEdDSAPCD.png)

Now, you've got your _claim_ (the chosen color name) and _proof_ (EdDSA signature) neatly stored on your PCD Passport and ready for the next step.

### Step 3: Interact with the PCD Consumer
With your PCD secured in your Passport, it's time to interact with the PCD Consumer. You can find the implementation at the [example-consumer](https://github.com/proofcarryingdata/example-consumer) repository. This step allows you to unlock the true potential of your PCD. Here's how it unfolds:

0. Follow the [🛠 Install](https://github.com/proofcarryingdata/example-consumer#-install) and [📜 Usage](https://github.com/proofcarryingdata/example-consumer#-usage) instructions in the [example-consumer](https://github.com/proofcarryingdata/example-consumer) repository. You should have the _client_ (`localhost:34269`) and _server_ (`localhost:3006`) up and- unning at the end of the process.
1. Navigate through the client. Click on `Get PCD Signature` and then select your PCD. 

![PCD Consumer Select](https://bafybeifvww36bjzgd4pcg2xnqswuv2qivkvycdokbamfmvu2zxcdrvs6ke.ipfs.w3s.link/pcdConsumerSelect.png)

2. The PCD Consumer client interacts with the server that checks if the _proof_ matches with the _claim_.
3. If the PCD proves its correctness, you should see an `alert` on the client and the background color of the page should change to your chosen color accordingly.

## 💻 PCD Issuer Integration

Integrating a PCD is a straightforward process, and this template, along with the `example-consumer`, serves as an excellent starting point. We'll now take a closer look at the core code blocks necessary to integrate a PCD (we are considering [zupass](https://github.com/proofcarryingdata/zupass/) as Passport along with the PCD SDK). To learn more about how to integrate the PCD Consumer, visit the `example-consumer` [README](https://github.com/proofcarryingdata/example-consumer#-pcd-consumer-integration).

The PCD Issuer should generate a _proof_ for a user _claim_ bundled in a form of a PCD. Generally, the integration of a PCD Issuer consists of the following steps:

### Server

0. Install the desired PCD implementation (e.g., [`@pcd/eddsa-pcd`](https://github.com/proofcarryingdata/zupass/tree/main/packages/eddsa-pcd)) and types ([`@pcd/pcd-types`](https://github.com/proofcarryingdata/zupass/tree/main/packages/pcd-types)) packages from the PCD SDK.

1. Initialize the specific PCD package before the execution of its methods (e.g., [`initEdDSAPCD()`](https://github.com/proofcarryingdata/example-issuer/blob/main/apps/server/src/index.ts#L16))

2. Implementation of an endpoint (POST) to forward the PCD computation request (e.g., [`sign-message`](https://github.com/proofcarryingdata/example-issuer/blob/main/apps/server/src/index.ts#L31)). The API will need to verify the correctness of the forwarded information related to the _claim_, construct the PCD ([`prove()`](https://github.com/proofcarryingdata/zupass/blob/main/packages/eddsa-pcd/src/EdDSAPCD.ts#L82)), return the PCD in a serialized form back to the client ([`serialize()`](https://github.com/proofcarryingdata/zupass/blob/main/packages/eddsa-pcd/src/EdDSAPCD.ts#L141)).

https://github.com/proofcarryingdata/example-issuer/blob/main/apps/server/src/index.ts#L31-L71

### Client

0. Install the [`@pcd/passport-interface`](https://github.com/proofcarryingdata/zupass/tree/main/packages/passport-interface) package containing all the necessary methods and types to interact with the PCD Passport.

1. Build an interface to receive the information about the _claim_ and forward it to the _server_ to calculate the PCD. 

2. Once the serialized PCD has been obtained, through the method [`constructPassportPcdAddRequestUrl()`](https://github.com/proofcarryingdata/example-issuer/blob/main/apps/client/src/App.tsx#L32), it will be possible to construct a parameterized URL with the PCD information that will allow the interaction with the PCD Passport via popup ([`openPassportPopup()`](https://github.com/proofcarryingdata/zupass/blob/main/packages/passport-interface/src/PassportPopup.ts#L90)) from which the user can finalize the addition of the PCD.

https://github.com/proofcarryingdata/example-issuer/blob/main/apps/client/src/App.tsx#L12-L39

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