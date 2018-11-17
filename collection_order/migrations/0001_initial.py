# Generated by Django 2.1.3 on 2018-11-15 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('collection_address', '0001_initial'),
        ('package', '0001_initial'),
        ('delivery_address', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollectionOrder',
            fields=[
                ('collection_order_id', models.AutoField(primary_key=True, serialize=False)),
                ('recipientsName', models.CharField(max_length=35)),
                ('recipientsSurname', models.CharField(max_length=35)),
                ('collection_address_id', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='collection_address.CollectionAddress')),
                ('delivery_address_id', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='delivery_address.DeliveryAddress')),
                ('package_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='package.Package')),
            ],
        ),
    ]