import {IsDefined, IsInt, IsOptional, IsString} from "class-validator";
import "./";

export class ESGNews {
    @IsDefined()
    @IsInt()
    request_id!: number;

    @IsDefined()
    @IsString()
    companyname!: string;

    @IsDefined()
    @IsString()
    url!: string;

    @IsDefined()
    @IsString()
    insider!: string;

    @IsDefined()
    @IsString()
    outsider!: string;

    @IsDefined()
    @IsString()
    ceo!: string;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsString()
    date!: string;

    @IsOptional()
    company_rel?: number;

    @IsOptional()
    insider_rel?: number;

    @IsOptional()
    outsider_rel?: number;

    @IsOptional()
    ceo_rel?: number;

    @IsOptional()
    company_sentiment?: number;

    @IsOptional()
    insider_sentiment?: number;

    @IsOptional()
    outsider_sentiment?: number;

    @IsOptional()
    ceo_sentiment?: number;

    @IsOptional()
    GHG_emissions_similarity?: number;

    @IsOptional()
    GHG_emissions_sentiment?: number;

    @IsOptional()
    Air_quality_similarity?: number;

    @IsOptional()
    Air_quality_sentiment?: number;

    @IsOptional()
    Energy_management_similarity?: number;

    @IsOptional()
    Energy_management_sentiment?: number;

    @IsOptional()
    Water_wastewater_management_similarity?: number;

    @IsOptional()
    Water_wastewater_management_sentiment?: number;

    @IsOptional()
    Waste_hazardous_management_similarity?: number;

    @IsOptional()
    Waste_hazardous_management_sentiment?: number;

    @IsOptional()
    Ecological_impact_similarity?: number;

    @IsOptional()
    Ecological_impact_sentiment?: number;

    @IsOptional()
    Human_rights_community_similarity?: number;

    @IsOptional()
    Human_rights_community_sentiment?: number;

    @IsOptional()
    Customer_privacy_similarity?: number;

    @IsOptional()
    Customer_privacy_sentiment?: number;

    @IsOptional()
    Data_security_similarity?: number;

    @IsOptional()
    Data_security_sentiment?: number;

    @IsOptional()
    Access_affordability_similarity?: number;

    @IsOptional()
    Access_affordability_sentiment?: number;

    @IsOptional()
    Product_quality_safety_similarity?: number;

    @IsOptional()
    Product_quality_safety_sentiment?: number;

    @IsOptional()
    Customer_welfare_similarity?: number;

    @IsOptional()
    Customer_welfare_sentiment?: number;

    @IsOptional()
    Selling_practices_product_label_similarity?: number;

    @IsOptional()
    Selling_practices_product_label_sentiment?: number;

    @IsOptional()
    Labor_practices_similarity?: number;

    @IsOptional()
    Labor_practices_sentiment?: number;

    @IsOptional()
    Modern_slavery_similarity?: number;

    @IsOptional()
    Modern_slavery_sentiment?: number;

    @IsOptional()
    Employee_health_safety_similarity?: number;

    @IsOptional()
    Employee_health_safety_sentiment?: number;

    @IsOptional()
    Employee_engagement_diversity_similarity?: number;

    @IsOptional()
    Employee_engagement_diversity_sentiment?: number;

    @IsOptional()
    Gender_equality_similarity?: number;

    @IsOptional()
    Gender_equality_sentiment?: number;

    @IsOptional()
    Product_design_lifecycle_similarity?: number;

    @IsOptional()
    Product_design_lifecycle_sentiment?: number;

    @IsOptional()
    Business_model_resilience_similarity?: number;

    @IsOptional()
    Business_model_resilience_sentiment?: number;

    @IsOptional()
    Environmental_supply_chain_similarity?: number;

    @IsOptional()
    Environmental_supply_chain_sentiment?: number;

    @IsOptional()
    Social_supply_chain_similarity?: number;

    @IsOptional()
    Social_supply_chain_sentiment?: number;

    @IsOptional()
    Materials_sourcing_efficiency_similarity?: number;

    @IsOptional()
    Materials_sourcing_efficiency_sentiment?: number;

    @IsOptional()
    Physical_impacts_climate_change_similarity?: number;

    @IsOptional()
    Physical_impacts_climate_change_sentiment?: number;

    @IsOptional()
    Governance_structures_similarity?: number;

    @IsOptional()
    Governance_structures_sentiment?: number;

    @IsOptional()
    Business_ethics_similarity?: number;

    @IsOptional()
    Business_ethics_sentiment?: number;

    @IsOptional()
    Competitive_behavior_similarity?: number;

    @IsOptional()
    Competitive_behavior_sentiment?: number;

    @IsOptional()
    Management_legal_regulatory_similarity?: number;

    @IsOptional()
    Management_legal_regulatory_sentiment?: number;

    @IsOptional()
    Risk_management_similarity?: number;

    @IsOptional()
    Risk_management_sentiment?: number;

    @IsOptional()
    Coronavirus_similarity?: number;

    @IsOptional()
    Coronavirus_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_1_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_1_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_2_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_2_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_3_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_3_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_4_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_4_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_5_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_5_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_6_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_6_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_7_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_7_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_8_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_8_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_9_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_9_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_10_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_10_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_11_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_11_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_12_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_12_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_13_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_13_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_14_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_14_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_15_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_15_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_16_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_16_sentiment?: number;

    @IsOptional()
    Sustainable_Development_Goal_17_similarity?: number;

    @IsOptional()
    Sustainable_Development_Goal_17_sentiment?: number;

    @IsOptional()
    Controversial_weapons_similarity?: number;

    @IsOptional()
    Controversial_weapons_sentiment?: number;
}
