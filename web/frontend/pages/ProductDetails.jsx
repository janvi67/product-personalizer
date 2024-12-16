import React from "react";
import { useLocation } from "react-router-dom";
import { Page, Layout, Card, TextContainer,Image ,DisplayText,Button,EmptyState,ResourceList,ResourceItem} from "@shopify/polaris";
import { useAppQuery } from "../hooks";

function ProductDetails() {
   
  const location = useLocation();
  const { product } = location.state || {};
  const { data} = useAppQuery({
    url: "api/products",
  });
  console.log("data",data)
  const { title, image} = product;
  

  if (!product) {
    return (
      <Page title="Product Details" fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <TextContainer>
                <p>No product details available. Please select a product.</p>
              </TextContainer>
            </Card>
            <Card>
              <TextContainer>
                <p>No product details available. Please select a product.</p>
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }


  

  return (
    <Page title={title} fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Product Information">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Image src={image} width="400" height="400"  alt={title}  />
              <TextContainer>
              <DisplayText variant="heading3xl" as="h1">
            {title}
              </DisplayText>
              </TextContainer>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                Click on the below button if you want to add some products manually.
              </p>
              <Button primary>Add Products Manually</Button>
            </div>
          </Card>
        </Layout.Section>

        {/* Product List Section */}
        <Layout.Section>
          {data?.products?.length > 0 ? (
            <Card>
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={data.products}
                renderItem={(product) => {
                  const { id, title, image } = product;
                  const media = (
                    <Thumbnail
                      source={image}
                      alt={`Image for ${title}`}
                      size="medium"
                    />
                  );

                  return (
                    <ResourceItem id={id} media={media} accessibilityLabel={`View details for ${title}`}>
                      <Stack alignment="center" distribution="equalSpacing">
                        <TextStyle variation="strong">{`${index + 1}. ${title}`}</TextStyle>
                        <Stack>
                          <Button plain>Info</Button>
                          <Button destructive onClick={() => handleDelete(id)}>
                            Delete
                          </Button>
                        </Stack>
                      </Stack>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          ) : (
            <Card>
              <EmptyState
                heading="No Products Found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Add products using the button above</p>
              </EmptyState>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ProductDetails;
