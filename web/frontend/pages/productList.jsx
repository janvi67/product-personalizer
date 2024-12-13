import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
} from "@shopify/polaris";
import React from "react";

export default function SimpleIndexTableExample() {
  const orders = [
    {
      id: "1020",
      product: "#1020",
      status: "Jul 20 at 4:34pm",
      type: "Jaydon Stanton",
      price: "$969.44",
      vendor: "urbancurate",
    },
    {
      id: "1019",
      product: "#1020",
      status: "Jul 20 at 4:34pm",
      type: "Jaydon Stanton",
      price: "$969.44",
      vendor: "urbancurate",
    },
    {
      id: "1018",
      product: "#1020",
      status: "Jul 20 at 4:34pm",
      type: "Jaydon Stanton",
      price: "$969.44",
      vendor: "urbancurate",
    },
  ];
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    ({ id, product, status, type, price ,vendor}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {product}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{type}</IndexTable.Cell>

        <IndexTable.Cell>{price}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Product" },
          { title: "Status" },
          { title: "Type" },
          { title: "Price" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
